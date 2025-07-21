import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  ChartConfiguration
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
  selector: 'app-histograma-card',
  templateUrl: './histograma-card.component.html',
  styleUrls: ['./histograma-card.component.css']
})
export class HistogramaCardComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() title: string = 'Histograma';
  @Input() dataLabels: string[] = [];
  @Input() dataValues: number[] = [];

  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  private chart!: Chart;

  ngAfterViewInit(): void {
    if (!this.chart && this.chartCanvas?.nativeElement) {
      this.renderChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart && (changes['dataLabels'] || changes['dataValues'])) {
      this.chart.data.labels = this.dataLabels;
      this.chart.data.datasets[0].data = this.dataValues;
      this.chart.update();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private renderChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.dataLabels,
        datasets: [{
          label: this.title,
          data: this.dataValues,
          backgroundColor: '#6E3002',
          borderColor: '#6E3002',
          borderWidth: 1,
          barPercentage: 0.9,
          categoryPercentage: 0.8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Rangos',
              color: '#6E3002'
            },
            ticks: {
              color: '#6E3002'
            },
            grid: {
              color: '#e0d5b9'
            }
          },
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: 'Frecuencia',
              color: '#6E3002'
            },
            ticks: {
              color: '#6E3002'
            },
            grid: {
              color: '#e0d5b9'
            }
          }
        },
        plugins: {
          tooltip: {
            enabled: true
          },
          legend: {
            display: false
          }
        }
      }
    };

    this.chart = new Chart(this.chartCanvas.nativeElement, config);
  }
}
