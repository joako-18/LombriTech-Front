import { Component, OnInit } from '@angular/core';
import { NavigateComponent } from "../../components/navigate/navigate.component";
import { RealTimeCardComponent } from '../../../../shared/components/real-time-card/real-time-card.component';
import { GraphCardComponent } from '../../../../shared/components/graph-card/graph-card.component';
import { SensorData } from '../../../../core/models/sensor-data.model';
import { SensorDataResponse } from '../../../../core/models/sensor-data.model';
import { SensorService } from '../../../../core/services/sensor.service';
import { ModalInicioComponent } from "../../components/modal-inicio/modal-inicio.component";
import { ModalFinalComponent } from "../../components/modal-final/modal-final.component";
import { SensorAlertComponent } from "../../components/sensor-alert/sensor-alert.component";
import { CommonModule } from '@angular/common';
import { T } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-home-dashboard',
  imports: [CommonModule, NavigateComponent, RealTimeCardComponent, GraphCardComponent, ModalInicioComponent, ModalFinalComponent, SensorAlertComponent],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.css'
})
export class HomeDashboardComponent implements OnInit {

  labels: string[] = [];
  phData: number[] = [];
  humedadData: number[] = [];
  isSensorAlertActive: boolean = false;

  constructor(private sensorService: SensorService) {}

  ngOnInit(): void {
   
  this.sensorService.obtenerDatos().subscribe((data: SensorDataResponse) => {
    console.log('Respuesta recibida:', data);
    if (data && data.datos) {
      this.labels.push(this.formatTimestamp(data.timestamp));
      this.phData.push(data.datos.ph);
      this.humedadData.push(data.datos.humedad);
    } else {
      console.error('data.datos es undefined o null:', data);
    }
  });

  }

  private formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }

  getDataSet(label: string, data: number[], color: string) {
    return [{ data, label, backgroundColor: color }];
  }

  getMultipleDataSets(ds: { label: string; data: number[]; color: string }[]) {
    return ds.map(e => ({ data: e.data, label: e.label, backgroundColor: e.color }));
  }

  isSamplingModalVisible: boolean = false;

  openSamplingModal(): void {
    this.isSamplingModalVisible = true;
  }

  handleInitiateSampling(data: { description: string, worms: number, compost: number }): void {
    console.log('Iniciando muestreo con los siguientes datos:', data);
    this.isSamplingModalVisible = false;
  }

  isEndSamplingModalVisible: boolean = false;

  openEndSamplingModal(): void {
    this.isEndSamplingModalVisible = true;
  }

  handleEndSampling(data: { worms: number, compost: number, leachate: number }): void {
    console.log('Terminando muestreo con los siguientes resultados:', data);
    this.isEndSamplingModalVisible = false;
  }

  toggleAlert(): void {
  this.isSensorAlertActive = !this.isSensorAlertActive;
  if (this.isSensorAlertActive) {
    console.log('Alerta de sensor activada.');
  } else {
    console.log('Alerta de sensor desactivada.');
  }
}

}