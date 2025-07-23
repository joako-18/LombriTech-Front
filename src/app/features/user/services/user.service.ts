// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, LoginRequest, TokenResponse } from '../../../core/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8000'; // Cambia si usas otra URL
  private tokenKey = 'access_token';

  constructor(private http: HttpClient) {}

  login(data: LoginRequest): Observable<TokenResponse> {
    const body = new URLSearchParams();
    body.set('username', data.correo);
    body.set('password', data.password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });

    return this.http.post<TokenResponse>(
      `${this.apiUrl}/auth/login`,
      body.toString(),
      { headers }
    );
  }

  setToken(token: string) {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
  }

  getUsers(): Observable<User[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.get<User[]>(`${this.apiUrl}/admin/users`, { headers });
  }

  updateUser(userId: number, data: Partial<User>): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.put<User>(`${this.apiUrl}/admin/users/${userId}`, data, { headers });
  }

  deleteUser(userId: number): Observable<void> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
    });
    return this.http.delete<void>(`${this.apiUrl}/admin/users/${userId}`, { headers });
  }

  registerUser(data: {
    nombre: string;
    apellidos: string;
    correo: string;
    password: string;
    password_confirm: string;
    rol: string;
  }): Observable<User> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json'
    });
    return this.http.post<User>(`${this.apiUrl}/admin/users`, data, { headers });
  }
}