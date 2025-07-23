import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ElementRef,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import {
  Chart,
  registerables
} from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-time-series-graphs',
  templateUrl: './time-series-graphs.component.html',
  styleUrl: './time-series-graphs.component.css'
})
export class TimeSeriesGraphsComponent implements AfterViewInit, OnChanges {
  @Input() title: string = 'Serie de Tiempo';
  @Input() color: string = '#6E3002';
  @Input() data: { timestamp: string; value: number }[] = [];

  @ViewChild('timeChartCanvas') timeChartCanvas!: ElementRef<HTMLCanvasElement>;
  chart!: Chart;

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] && !changes['data'].firstChange) {
      this.createChart();  // Redibuja la gráfica si cambian los datos
    }
  }

  createChart(): void {
    if (!this.timeChartCanvas) return;

    const ctx = this.timeChartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const labels = this.data.map(d => d.timestamp);
    const values = this.data.map(d => d.value);

    if (this.chart) this.chart.destroy();  // Destruir el gráfico anterior

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
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
        maintainAspectRatio: false,
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
