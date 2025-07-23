import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface AlertConfig {
  tipo_sensor: string;
  valor_minimo: number;
  valor_maximo: number;
  intervalo: number;
  composta_id: number;
}

@Injectable({
  providedIn: "root"
})

export class AlertaService {
  private apiUrl = "http://localhost:8000/alertas";

  constructor(private http: HttpClient) {}

  guardarConfiguracion(config: AlertConfig): Observable<any> {
    return this.http.post(this.apiUrl, config);
  }
}
