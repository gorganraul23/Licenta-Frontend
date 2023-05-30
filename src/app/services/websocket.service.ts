import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environments} from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private socket?: WebSocket;
  websocketUrl = environments.websocketUrl;

  constructor() { }

  connect(): Observable<any>{
    this.socket = new WebSocket(this.websocketUrl);

    return new Observable((observer) => {
      this.socket!.onopen = () => {
        observer.next({type: 'open'});
      };

      this.socket!.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        observer.next({type: 'message', data: data});
      }

      this.socket!.onclose = () => {
        observer.next({type: 'close'});
        observer.complete();
      };

      this.socket!.onerror = (error) => {
        observer.error(error);
      };

    });
  }

  send(message: string): void {
    this.socket?.send(JSON.stringify({message}));
  }

  close(): void {
    this.socket?.close();
  }

}
