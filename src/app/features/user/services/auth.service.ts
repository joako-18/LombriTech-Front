import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode'; // <-- import named

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenKey = 'access_token';

  private roleSubject = new BehaviorSubject<string | null>(this.getUserRole());
  role$ = this.roleSubject.asObservable();

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

 getUserRole(): string | null {
  const token = this.getToken();
  if (!token) return null;

  try {
    const payload: any = jwtDecode(token);
    console.log('Role in token:', payload.rol);
    return (payload.rol || '').toLowerCase() || null;
  } catch {
    return null;
  }
}

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    const rol = this.getUserRole();
    this.roleSubject.next(rol);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.roleSubject.next(null);
  }
}
