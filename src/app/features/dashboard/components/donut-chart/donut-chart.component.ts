import { Component, Input, ElementRef, ViewChild, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, DoughnutController, ArcElement, Tooltip, Legend, ChartConfiguration } from 'chart.js';
Chart.register(DoughnutController, ArcElement, Tooltip, Legend);
@Component({
  selector: 'app-donut-chart',
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css']
})
export class DonutChartComponent implements AfterViewInit, OnDestroy, OnChanges {
  @ViewChild('doughnutCanvas') doughnutCanvas!: ElementRef<HTMLCanvasElement>;

  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() colors: string[] = [];

  chart: Chart | undefined;
  chartInitialized = false;

  ngAfterViewInit(): void {
    this.chartInitialized = true;
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chartInitialized && (changes['labels'] || changes['data'] || changes['colors'])) {
      this.createChart();
    }
  }

  createChart(): void {
    if (this.chart) {
      this.chart.destroy();
    }

    const ctx = this.doughnutCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: {
        labels: this.labels,
        datasets: [
          {
            data: this.data,
            backgroundColor: this.colors,
            hoverOffset: 4
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    };

    this.chart = new Chart(ctx, config);
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }
}
