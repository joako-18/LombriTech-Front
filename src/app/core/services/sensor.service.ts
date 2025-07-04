import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SensorDataResponse } from '../models/sensor-data.model';

@Injectable({
  providedIn: 'root',
})
export class SensorService {
  private apiUrl = 'http://localhost:3000/datos'; 

  constructor(private http: HttpClient) {}

  obtenerDatos(): Observable<SensorDataResponse> {
    return this.http.get<SensorDataResponse>(this.apiUrl);
  }



}
