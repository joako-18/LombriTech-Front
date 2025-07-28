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
import { EstadisticasService } from '../../../../core/services/estadisticas.service';
import { ReporteService } from '../../../../core/services/reporte.service';
import { AlertsService } from '../../../../core/services/alerts.service';

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

  corTempHumData: { sensor1: number, sensor2: number }[] = [];
  corPhTdsData: { sensor1: number, sensor2: number }[] = [];
  corTempHumValor: number = 0;
  corPhTdsValor: number = 0;

  sensorName: string = '';
  alertDescription: string = '';

  reportesGenerados: { nombre: string, url: string, fecha: string }[] = [];

  constructor(
    private estadisticasService: EstadisticasService,
    private reporteService: ReporteService,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {
  this.estadisticasService.connect();

  this.estadisticasService.getEstadisticas().subscribe((data) => {
    const valores = data?.valores_individuales;
    if (valores) {
      this.humedadValue = valores['humedad'] ?? 0;
      this.conductividadValue = valores['tds'] ?? 0;
      this.temperaturaValue = valores['temperatura'] ?? 0;
      this.phValue = valores['ph'] ?? 0;
      this.turbidezValue = valores['sst'] ?? 0;
    }

    const correlaciones = data?.correlaciones_especificas;
    if (correlaciones) {
      const tempHum = correlaciones['temperatura_humedad'];
      if (tempHum?.x?.length && tempHum?.y?.length) {
        this.corTempHumData = tempHum.x.map((x: number, i: number) => ({
          sensor1: x,
          sensor2: tempHum.y[i]
        }));
        this.corTempHumValor = tempHum.valor ?? 0;
        console.log('Correlación Temperatura-Humedad:', this.corTempHumData, this.corTempHumValor);
      }

      const phTds = correlaciones["ph_tds"];
      if (phTds?.x?.length && phTds?.y?.length) {
        this.corPhTdsData = phTds.x.map((x: number, i: number) => ({
          sensor1: x,
          sensor2: phTds.y[i]
        }));
        this.corPhTdsValor = phTds.valor ?? 0;
        console.log('Correlación pH-TDS:', this.corPhTdsData, this.corPhTdsValor);
      }
    }
  });

  this.alertsService.connect();
  this.alertsService.getAlertas().subscribe((mensaje: string) => {
    this.isSensorAlertActive = true;
    this.alertDescription = mensaje;
    this.sensorName = this.detectarSensorDesdeMensaje(mensaje);
    console.log('[HomeDashboard] Alerta recibida:', mensaje);
    console.log('[HomeDashboard] Sensor detectado:', this.sensorName);

    this.alertsService.enviarAlertaTelegram(mensaje)?.subscribe({
      next: () => console.log('[HomeDashboard] Alerta enviada a Telegram correctamente.'),
      error: (err) => console.error('[HomeDashboard] Error al enviar alerta a Telegram:', err)
    })
  });
}

private detectarSensorDesdeMensaje(mensaje: string): string {
  const sensores = ['temperatura', 'humedad', 'ph', 'turbidez', 'conductividad'];
  return sensores.find(sensor => mensaje.toLowerCase().includes(sensor)) || 'sensor';
}


  openSamplingModal(): void {
    this.isSamplingModalVisible = true;
  }

  handleInitiateSampling(data: { description: string, worms: number, wormsUnit: string, wormType: string }): void {
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

  // Título
  doc.setFontSize(22);
  doc.text('Reporte de Medición de LombriTech', 10, 20);

  // Fecha
  const now = new Date();
  const fechaHora = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  doc.setFontSize(10);
  doc.text(`Fecha del reporte: ${fechaHora}`, 10, 30);

  // Contenido
  doc.setFontSize(12);
  let yOffset = 50;
  doc.text(`Resultados del Muestreo:`, 10, yOffset);
  yOffset += 10;
  doc.text(`Lombrices: ${data.worms}`, 20, yOffset);
  yOffset += 10;
  doc.text(`Compost: ${data.compost}`, 20, yOffset);
  yOffset += 10;
  doc.text(`Lixiviados: ${data.leachate}`, 20, yOffset);
  yOffset += 20;

  doc.text('Últimos valores de sensores registrados:', 10, yOffset);
  yOffset += 10;
  doc.text(`PH: ${this.phValue}`, 20, yOffset);
  yOffset += 10;
  doc.text(`Humedad: ${this.humedadValue}%`, 20, yOffset);
  yOffset += 10;
  doc.text(`Temperatura: ${this.temperaturaValue}°C`, 20, yOffset);
  yOffset += 10;
  doc.text(`Conductividad: ${this.conductividadValue} EC`, 20, yOffset);
  yOffset += 10;
  doc.text(`Turbidez: ${this.turbidezValue}`, 20, yOffset);
  yOffset += 20;

  // Generar Blob y URL
  const pdfBlob = doc.output('blob');
  const blobUrl = URL.createObjectURL(pdfBlob);
  const nombreArchivo = `reporte-lombri-tech_${now.toLocaleDateString().replace(/\//g, '-')}_${now.getHours()}-${now.getMinutes()}-${now.getSeconds()}.pdf`;

  // ⬇️ Guarda el reporte usando el servicio (NO local)
  this.reporteService.agregarReporte({
    nombre: nombreArchivo,
    url: blobUrl,
    fecha: fechaHora
  });

  // Opcional: abrir en nueva pestaña
  window.open(blobUrl, '_blank');
}

}