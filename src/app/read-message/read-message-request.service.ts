import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Key } from './models/key.model';
import { MessageResult } from './models/message-result.model';

@Injectable()
export class ReadMessageRequestService {

  public constructor(
    private http: HttpClient
  ) {}

  public getKey(): Observable<Key> {
    return this.http.get<Key>(`${environment.baseUrl}/message/key`);
  }

  public getMessage(publicKey: string, keyId: string, messageId: string, password: string, urlPassword: string): Observable<MessageResult> {
    return this.http.post<MessageResult>(`${environment.baseUrl}/message/get`, {
      publicKey, keyId, messageId, password, urlPassword
    });
  }

}
