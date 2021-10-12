import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AesService } from '@shared/aes';
import { Key, MessageMetadata, MessageResult } from '@shared/models';
import { environment } from 'environments/environment';
import * as forge from 'node-forge';
import { Observable } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';

@Injectable()
export class EncodotApiService {

  public constructor(
    private http: HttpClient,
    private aes: AesService
  ) {}

  private getRsaKeyPair(bits: number): Observable<forge.pki.rsa.KeyPair> {
    return new Observable(s => {
      const pair = forge.pki.rsa.generateKeyPair(bits);
      s.next(pair);
      s.complete();
      return () => {};
    });
  }

  private getTransactionKey(): Observable<Key> {
    return this.getRsaKeyPair(1024).pipe(
      concatMap(p => {
        const publicPem = forge.pki.publicKeyToPem(p.publicKey);
        return this.http.post<Key>(`${environment.baseUrl}/message/transaction-key`, { publicKey: publicPem }).pipe(
          map(k => [ p, k ])
        );
      }),
      map(([ p, k ]: [ forge.pki.rsa.KeyPair, Key ]) => {
        const clearKey = p.privateKey.decrypt(forge.util.decode64(k.key));
        return { id: k.id, key: clearKey };
      })
    );
  }

  public addMessage(message: string, password: string): Observable<MessageMetadata> {
    return this.getTransactionKey().pipe(
      concatMap(k => {
        console.log('Got transaction key', k.id);
        const encryptedBody = this.aes.encryptObj({ keyId: k.id, message, password }, k.key, [ 'message', 'password' ]);
        return this.http.post<MessageMetadata>(`${environment.baseUrl}/message/add`, encryptedBody).pipe(
          map(m => [ k, m ] as [ Key, MessageMetadata ])
        );
      }),
      map(([ k, m ]) => {
        return this.aes.decryptObj(m, k.key, [ 'id', 'urlPassword' ]);
      })
    );
  }

  public getMessage(messageId: string, password: string, urlPassword: string): Observable<MessageResult> {
    return this.getTransactionKey().pipe(
      concatMap(k => {
        console.log('Got transaction key', k.id);
        const encryptedBody = this.aes.encryptObj(
          { keyId: k.id, messageId, password, urlPassword }, k.key, [ 'messageId', 'password', 'urlPassword' ]
        );
        return this.http.post<MessageResult>(`${environment.baseUrl}/message/get`, encryptedBody).pipe(
          map(m => [ k, m ] as [ Key, MessageResult ])
        );
      }),
      map(([ k, m ]) => {
        return this.aes.decryptObj(m, k.key, [ 'message' ]);
      })
    );
  }

}
