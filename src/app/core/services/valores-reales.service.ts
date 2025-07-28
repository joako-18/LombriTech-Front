import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ValoresRealesService {
    private socket!: WebSocket;
    private valoresSubject = new Subject<any>();

    connect(): void {
        if (this.socket && this.socket.readyState === WebSocket.OPEN) return;
        this.socket = new WebSocket('ws://localhost:8000/ws/valores-reales');

        this.socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            this.valoresSubject.next(data);
        };

        this.socket.onerror = (err) => {
            console.error('[ValoresRealesService] WebSocket error:', err);
        };
    }

    getValores(): Observable<any> {
        return this.valoresSubject.asObservable();
    }
}