import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserService } from '../../features/user/services/user.service';

@Injectable({
providedIn: 'root'
})
export class AlertsService {

  constructor(private http: HttpClient, private userService: UserService) {}

  private socket!: WebSocket;
  private alertSubject = new Subject<string>();
  
  connect(): void {
    if (this.socket && this.socket.readyState !== WebSocket.CLOSED) {
      return;
    }

    this.socket = new WebSocket('wss://lombritech.backend.upprojects.online/ws/alertas');

    this.socket.onopen = () => {
      console.log('[AlertsService] WebSocket conectado');
    };
    
    this.socket.onmessage = (event) => {
      console.log('[AlertsService] Alerta recibida:', event.data);
      this.alertSubject.next(event.data);
    };
    
    this.socket.onerror = (error) => {
      console.error('[AlertsService] WebSocket error:', error);
    };

    this.socket.onclose = () => {
      console.warn('[AlertsService] WebSocket cerrado');
    };
  }

  getAlertas(): Observable<string> {
    return this.alertSubject.asObservable();
  }

  enviarAlertaTelegram(mensaje:string) {
    const userId = this.userService.getUserIdFromToken();
    const token = this.userService.getToken();

    if (!userId || !token) {
      console.error('[AlertsService] Usuario no autenticado o token no disponible');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.post(`https://lombritech.backend.upprojects.online/alertas/usuario/${userId}`, { mensaje }, { headers });
  }
}