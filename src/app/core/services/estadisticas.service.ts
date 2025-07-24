import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  private socket!: WebSocket;
  private estadisticasSubject = new Subject<any>();

  connect(): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) return;

    this.socket = new WebSocket('ws://localhost:8000/ws/estadisticas');

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.estadisticasSubject.next(data);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  }

  getEstadisticas(): Observable<any> {
    return this.estadisticasSubject.asObservable();
  }
}
