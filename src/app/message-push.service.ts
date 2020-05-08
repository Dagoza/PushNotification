import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MessagePushService {

  constructor(private http: HttpClient) { }

  sendNotification(body){
    return this.http.post(environment.cloudFunctionEndpoint, body).toPromise()
  }
}
