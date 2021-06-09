import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Key, MessageMetadata } from '@shared/models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class WriteMessageRequestService {

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

}
