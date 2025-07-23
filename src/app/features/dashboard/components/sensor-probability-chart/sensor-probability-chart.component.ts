import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { EstadisticasService } from '../../../../core/services/estadisticas.service';
@Component({
  selector: 'app-sensor-probability-chart',
  templateUrl: './sensor-probability-chart.component.html',
  styleUrls: ['./sensor-probability-chart.component.css']
})
export class SensorProbabilityChartComponent implements AfterViewInit {
  @ViewChild('barChartCanvas', { static: false }) barChartCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  constructor(private estadisticasService: EstadisticasService) {}

  ngAfterViewInit(): void {
    const ctx = this.barChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Temperatura', 'PH', 'Humedad', 'Conductividad Eléctrica', 'Turbidez'],
        datasets: [
          {
            label: 'Probabilidad de Subida',
            data: [0, 0, 0, 0, 0],
            backgroundColor: '#4382af',
            borderColor: '#37678c',
            borderWidth: 1
          },
          {
            label: 'Probabilidad de Bajada',
            data: [0, 0, 0, 0, 0],
            backgroundColor: '#e6533c',
            borderColor: '#cc4330',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (val) => `${(Number(val) * 100).toFixed(0)}%`,
              color: '#6E3002'
            },
            grid: {
              color: 'rgba(110, 48, 2, 0.1)'
            }
          },
          x: {
            ticks: {
              color: '#6E3002'
            },
            grid: {
              color: 'rgba(110, 48, 2, 0.1)'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: 'Probabilidad de Cambio en Sensores',
            color: '#6E3002',
            font: { size: 18 }
          },
          legend: {
            labels: { color: '#6E3002' }
          }
        }
      }
    });

    this.estadisticasService.connect();
    this.estadisticasService.getEstadisticas().subscribe((data) => {
      const subida = data?.probabilidad?.subida || {};
      const bajada = data?.probabilidad?.bajada || {};

      const sensores = ['temperatura', 'ph', 'humedad', 'ec', 'sst'];
      const labels = ['Temperatura', 'PH', 'Humedad', 'Conductividad Eléctrica', 'Turbidez'];

      const subidaData = sensores.map((key) => subida[key] ?? 0);
      const bajadaData = sensores.map((key) => bajada[key] ?? 0);

      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = subidaData;
      this.chart.data.datasets[1].data = bajadaData;
      this.chart.update();
    });
  }
}
