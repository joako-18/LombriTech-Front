import { Component, OnInit } from '@angular/core';
import { NavigateComponent } from "../../components/navigate/navigate.component";
import { RealTimeCardComponent } from '../../../../shared/components/real-time-card/real-time-card.component';
import { SensorDataResponse } from '../../../../core/models/sensor-data.model';
import { SensorService } from '../../../../core/services/sensor.service';
import { ModalInicioComponent } from "../../components/modal-inicio/modal-inicio.component";
import { ModalFinalComponent } from "../../components/modal-final/modal-final.component";
import { SensorAlertComponent } from "../../components/sensor-alert/sensor-alert.component";
import { CommonModule } from '@angular/common';
import { SensorProbabilityChartComponent } from "../../components/sensor-probability-chart/sensor-probability-chart.component";
import { GraphCardComponent } from '../../../../shared/components/graph-card/graph-card.component';
import jsPDF from 'jspdf'; // Importa jsPDF

@Component({
  selector: 'app-home-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    GraphCardComponent,
    NavigateComponent,
    RealTimeCardComponent,
    ModalInicioComponent,
    ModalFinalComponent,
    SensorAlertComponent,
    SensorProbabilityChartComponent
  ],
  templateUrl: './home-dashboard.component.html',
  styleUrl: './home-dashboard.component.css'
})
export class HomeDashboardComponent implements OnInit {

  // Variables para valores aleatorios
  humedadValue = 0;
  conductividadValue = 0;
  temperaturaValue = 0;
  phValue = 0;
  turbidezValue = 0;

  // Estado de alerta de sensor
  isSensorAlertActive: boolean = false;

  // Estado de modales
  isSamplingModalVisible: boolean = false;
  isEndSamplingModalVisible: boolean = false;

  // Gráficas
  labels: string[] = [];
  phData: number[] = [];
  humedadData: number[] = [];

  constructor(private sensorService: SensorService) {}

  ngOnInit(): void {
    this.startSensorSimulation(); // Iniciar simulación de sensores

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

  // Simulación de sensores
  private startSensorSimulation(): void {
    setInterval(() => {
      this.humedadValue = this.getRandomInt(40, 100);
      this.conductividadValue = parseFloat((Math.random() * 2).toFixed(2));
      this.temperaturaValue = this.getRandomInt(15, 35);
      this.phValue = parseFloat((5 + Math.random() * 3).toFixed(2));
      this.turbidezValue = this.getRandomInt(0, 100);
    }, 2000);
  }

  private getRandomInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

  // Métodos para modales
  openSamplingModal(): void {
    this.isSamplingModalVisible = true;
  }

  handleInitiateSampling(data: { description: string, worms: number, compost: number }): void {
    console.log('Iniciando muestreo con los siguientes datos:', data);
    this.isSamplingModalVisible = false;
  }

  openEndSamplingModal(): void {
    this.isEndSamplingModalVisible = true;
  }

  handleEndSampling(data: { worms: number, compost: number, leachate: number }): void {
    console.log('Terminando muestreo con los siguientes resultados:', data);
    this.isEndSamplingModalVisible = false;
    this.generatePdfReport(data); // Llama a la función para generar el PDF
  }

  toggleAlert(): void {
    this.isSensorAlertActive = !this.isSensorAlertActive;
    if (this.isSensorAlertActive) {
      console.log('Alerta de sensor activada.');
    } else {
      console.log('Alerta de sensor desactivada.');
    }
  }

  /**
   * Genera un reporte PDF con los resultados de la medición.
   * @param data Los datos finales del muestreo.
   */
  private generatePdfReport(data: { worms: number, compost: number, leachate: number }): void {
    const doc = new jsPDF();

    // Título del reporte
    doc.setFontSize(22);
    doc.text('Reporte de Medición de LombriTech', 10, 20);

    // Fecha y hora del reporte
    const now = new Date();
    doc.setFontSize(10);
    doc.text(`Fecha del reporte: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`, 10, 30);

    // Contenido del reporte
    doc.setFontSize(12);
    let yOffset = 50; // Posición inicial para el contenido

    doc.text(`Resultados del Muestreo:`, 10, yOffset);
    yOffset += 10;
    doc.text(`Lombrices: ${data.worms}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Compost: ${data.compost}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Lixiviados: ${data.leachate}`, 20, yOffset);
    yOffset += 10;


    // ***** COMIENZO DEL LUGAR PARA AÑADIR MÁS CONTENIDO AL REPORTE *****
    // Aquí puedes añadir más datos al reporte PDF.
    // Puedes acceder a las variables de tu componente como:
    // - `this.phData`, `this.humedadData`, `this.labels` para los datos de las gráficas
    // - `this.phValue`, `this.humedadValue`, etc. para los últimos valores registrados
    // - Cualquier otra información relevante que quieras incluir del componente.

    // Ejemplo: Añadir los datos de las últimas mediciones:
    doc.text('Últimos valores de sensores registrados:', 10, yOffset + 20);
    yOffset += 30;
    doc.text(`PH: ${this.phValue}`, 20, yOffset);
    yOffset += 10;
    doc.text(`Humedad: ${this.humedadValue}%`, 20, yOffset);
    yOffset += 10;
    doc.text(`Temperatura: ${this.temperaturaValue}°C`, 20, yOffset);
    yOffset += 10;
    doc.text(`Conductividad: ${this.conductividadValue} EC`, 20, yOffset);
    yOffset += 10;
    doc.text(`Turbidez: ${this.turbidezValue}`, 20, yOffset);
    yOffset += 10;

    // Puedes iterar sobre los datos históricos si los tienes:
    /*
    doc.text('Datos históricos (PH):', 10, yOffset + 20);
    yOffset += 30;
    this.phData.forEach((ph, index) => {
        doc.text(`Hora: ${this.labels[index]}, PH: ${ph}`, 20, yOffset);
        yOffset += 7; // Pequeño incremento para cada línea
    });
    */

    // Si tuvieras imágenes de gráficas (requiere html2canvas y jspdf-autotable para tablas)
    // const canvas = document.getElementById('myChart') as HTMLCanvasElement;
    // const imgData = canvas.toDataURL('image/png');
    // doc.addImage(imgData, 'PNG', 10, yOffset, 180, 100);
    // yOffset += 110;

    // ***** FIN DEL LUGAR PARA AÑADIR MÁS CONTENIDO AL REPORTE *****


    // Guardar el PDF
    doc.save(`reporte-lombri-tech_${now.toLocaleDateString().replace(/\//g, '-')}.pdf`);
  }


  // Datos adicionales de gráficas (opcional si aún usas estas)
  scatterTempCond = [
    {
      label: 'Temperatura vs Conductividad',
      data: [
        { x: 22, y: 0.5 },
        { x: 23, y: 0.6 },
        { x: 24, y: 0.8 }
      ],
      backgroundColor: 'rgba(255, 159, 64, 0.7)'
    }
  ];

  scatterHumCond = [
    {
      label: 'Humedad vs Conductividad',
      data: [
        { x: 60, y: 0.4 },
        { x: 62, y: 0.6 },
        { x: 65, y: 0.9 }
      ],
      backgroundColor: 'rgba(153, 102, 255, 0.7)'
    }
  ];

  scatterTurbCond = [
    {
      label: 'Turbidez vs Conductividad',
      data: [
        { x: 1.5, y: 0.5 },
        { x: 2.0, y: 0.7 },
        { x: 2.5, y: 0.9 }
      ],
      backgroundColor: 'rgba(255, 99, 132, 0.7)'
    }
  ];

  scatterTurbPh = [
    {
      label: 'Turbidez vs pH',
      data: [
        { x: 1.5, y: 6.5 },
        { x: 2.0, y: 7.0 },
        { x: 2.5, y: 8.2 }
      ],
      backgroundColor: 'rgba(54, 162, 235, 0.7)'
    }
  ];

  densityTemp = {
    labels: Array.from({ length: 30 }, (_, i) => (20 + i * 0.3).toFixed(1)),
    datasets: [{
      label: 'Temperatura',
      data: [0.01, 0.03, 0.08, 0.15, 0.21, 0.25, 0.23, 0.17, 0.1, 0.05],
      borderColor: 'rgba(255, 99, 132, 1)',
      fill: false
    }]
  };

  densityHum = {
    labels: Array.from({ length: 30 }, (_, i) => (50 + i).toString()),
    datasets: [{
      label: 'Humedad',
      data: [0.02, 0.06, 0.14, 0.22, 0.25, 0.21, 0.14, 0.07, 0.03, 0.01],
      borderColor: 'rgba(54, 162, 235, 1)',
      fill: false
    }]
  };

  densityTurb = {
    labels: Array.from({ length: 30 }, (_, i) => (1 + i * 0.2).toFixed(1)),
    datasets: [{
      label: 'Turbidez',
      data: [0.01, 0.04, 0.12, 0.22, 0.27, 0.22, 0.1, 0.03, 0.01],
      borderColor: 'rgba(153, 102, 255, 1)',
      fill: false
    }]
  };

  densityCond = {
    labels: Array.from({ length: 30 }, (_, i) => (0.2 + i * 0.1).toFixed(2)),
    datasets: [{
      label: 'Conductividad',
      data: [0.02, 0.06, 0.14, 0.22, 0.25, 0.21, 0.14, 0.07, 0.03],
      borderColor: 'rgba(255, 159, 64, 1)',
      fill: false
    }]
  };

  densityPh = {
    labels: Array.from({ length: 30 }, (_, i) => (5.5 + i * 0.1).toFixed(1)),
    datasets: [{
      label: 'pH',
      data: [0.01, 0.03, 0.08, 0.15, 0.21, 0.25, 0.23, 0.17, 0.1, 0.05],
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: false
    }]
  };

  dataDeSensores = [
    { x: 1.1, y: 2.2 },
    { x: 2.5, y: 3.8 },
    { x: 3.3, y: 4.1 },
    { x: 4.8, y: 5.5 },
    { x: 5.0, y: 5.9 }
  ];
}