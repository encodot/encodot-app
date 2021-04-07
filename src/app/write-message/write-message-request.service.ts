import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Key } from './models/key.model';
import { MessageMetadata } from './models/message-metadata.model';

@Injectable()
export class WriteMessageRequestService {

  public constructor(
    private http: HttpClient
  ) {}

  public getKey(): Observable<Key> {
    return this.http.get<Key>(`${environment.baseUrl}/message/key`);
  }

  public addMessage(keyId: string, message: string, password: string): Observable<MessageMetadata> {
    return this.http.post<MessageMetadata>(`${environment.baseUrl}/message/add`, {
      keyId, message, password
    });
  }

}
