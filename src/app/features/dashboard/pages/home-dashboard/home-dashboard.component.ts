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

correlationMatrixData = [
  {
    label: 'Correlaciones',
    data: [
      { x: 0, y: 0, r: 10 }, // Ph vs Ph
      { x: 1, y: 0, r: 6 },  // Humedad vs Ph
      { x: 2, y: 0, r: 7 },  // Temp vs Ph
      { x: 3, y: 0, r: 5 },  // Conductividad vs Ph
      { x: 1, y: 2, r: 8 },  // Temp vs Humedad
      { x: 2, y: 3, r: 9 }   // Temp vs Conductividad
    ],
    backgroundColor: 'rgba(255, 99, 132, 0.5)'
  }
];

scatterPhTemp = [
  {
    label: 'Ph vs Temperatura',
    data: [
      { x: 6.8, y: 22 },
      { x: 7.2, y: 23 },
      { x: 8.3, y: 24 }
    ],
    backgroundColor: 'rgba(255, 206, 86, 0.7)'
  }
];

scatterHumTemp = [
  {
    label: 'Humedad vs Temperatura',
    data: [
      { x: 60, y: 22 },
      { x: 62, y: 23 },
      { x: 65, y: 24 }
    ],
    backgroundColor: 'rgba(54, 162, 235, 0.7)'
  }
];

scatterPhCond = [
  {
    label: 'Ph vs Conductividad',
    data: [
      { x: 6.5, y: 0.4 },
      { x: 7.0, y: 0.6 },
      { x: 8.0, y: 0.9 }
    ],
    backgroundColor: 'rgba(75, 192, 192, 0.7)'
  }
];


}