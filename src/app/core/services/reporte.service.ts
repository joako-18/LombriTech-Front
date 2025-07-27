// reporte.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
  private reportes: { nombre: string, url: string, fecha: string }[] = [];

  agregarReporte(reporte: { nombre: string, url: string, fecha: string }) {
    this.reportes.push(reporte);
  }

  getReportes() {
    return this.reportes;
  }
}
