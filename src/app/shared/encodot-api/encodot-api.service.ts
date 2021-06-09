import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Key, MessageMetadata, MessageResult } from '@shared/models';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class EncodotApiService {

  public constructor(
    private http: HttpClient
  ) {}

  public getKey(): Observable<Key> {
    return this.http.get<Key>(`${environment.baseUrl}/message/key`);
  }

  public addMessage(message: string, password: string): Observable<MessageMetadata> {
    return this.http.post<MessageMetadata>(`${environment.baseUrl}/message/add`, {
      message, password
    });
  }

  public getMessage(publicKey: string, messageId: string, password: string, urlPassword: string): Observable<MessageResult> {
    return this.http.post<MessageResult>(`${environment.baseUrl}/message/get`, {
      publicKey, messageId, password, urlPassword
    });
  }

}
