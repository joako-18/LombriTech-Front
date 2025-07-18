import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  ChartDataset,
  ChartOptions,
  registerables
} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-time-series-graphs',
  imports: [],
  templateUrl: './time-series-graphs.component.html',
  styleUrl: './time-series-graphs.component.css'
})
export class TimeSeriesGraphsComponent {
 @Input() title: string = 'Serie de Tiempo';
  @Input() color: string = '#6E3002';
  @Input() data: { timestamp: string; value: number }[] = [];

  @ViewChild('timeChartCanvas') timeChartCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  ngAfterViewInit(): void {
    this.createChart();
  }

  createChart(): void {
    if (this.chart) this.chart.destroy();

    const labels = this.data.map(d => d.timestamp);
    const values = this.data.map(d => d.value);

    this.chart = new Chart(this.timeChartCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: this.title,
          data: values,
          borderColor: this.color,
          backgroundColor: this.color + '33',
          tension: 0.3,
          pointRadius: 2
        }]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Tiempo'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Valor'
            }
          }
        },
        plugins: {
          title: {
            display: true,
            text: this.title
          },
          legend: {
            display: false
          }
        }
      }
    });
  }
}
