import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

@Component({
  selector: 'app-sensor-probability-chart',
  templateUrl: './sensor-probability-chart.component.html',
  styleUrls: ['./sensor-probability-chart.component.css']
})
export class SensorProbabilityChartComponent implements AfterViewInit {
  @ViewChild('barChartCanvas', { static: false }) barChartCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  ngAfterViewInit(): void {
    const ctx = this.barChartCanvas.nativeElement.getContext('2d');

    if (!ctx) {
      console.error('No se pudo obtener el contexto del canvas.');
      return;
    }

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Temperatura', 'PH', 'Humedad', 'Conductividad Eléctrica', 'Turbidez'],
        datasets: [
          {
            label: 'Probabilidad de Subida',
            data: [0.75, 0.2, 0.6, 0.45, 0.8],
            backgroundColor: '#4382af',
            borderColor: '#37678c',
            borderWidth: 1
          },
          {
            label: 'Probabilidad de Bajada',
            data: [0.1, 0.6, 0.25, 0.3, 0.05],
            backgroundColor: '#e6533c',
            borderColor: '#cc4330',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        backgroundColor: '#f9f1dc',
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: function (tickValue: string | number) {
                const value = typeof tickValue === 'number' ? tickValue : parseFloat(tickValue);
                if (isNaN(value)) return '';
                return (value * 100).toFixed(0) + '%';
              },
              color: '#6E3002'
            },
            grid: {
              color: 'rgba(110, 48, 2, 0.1)' // líneas sutiles en marrón
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
            font: {
              size: 18
            }
          },
          legend: {
            labels: {
              color: '#6E3002'
            }
          }
        }
      }
    });
  }
}
