import { Component, Input, AfterViewInit, ElementRef, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-graph-card',
  templateUrl: './graph-card.component.html',
  styleUrls: ['./graph-card.component.css'],
})
export class GraphCardComponent implements AfterViewInit, OnChanges {
  @Input() sensor1Name!: string;
  @Input() sensor2Name!: string;
  @Input() title!: string;
  @Input() dataPoints!: { sensor1: number; sensor2: number }[];

  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart: Chart | undefined;

  ngAfterViewInit(): void {
    if (this.dataPoints && this.chartCanvas) {
      this.createScatterChart();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataPoints'] && this.chartCanvas?.nativeElement) {
      this.updateScatterChart();
    }
  }

  createScatterChart(): void {
    const scatterData = this.dataPoints.map(dp => ({
      x: dp.sensor1,
      y: dp.sensor2,
    }));

    this.chart = new Chart(this.chartCanvas.nativeElement, {
      type: 'scatter',
      data: {
        datasets: [{
          label: `${this.sensor1Name} vs ${this.sensor2Name}`,
          data: scatterData,
          backgroundColor: '#6E3002',
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '#6E3002',
              font: {
                weight: 'bold'
              }
            }
          },
          title: {
            display: true,
            text: this.title,
            color: '#6E3002',
            font: {
              size: 18,
              weight: 'bold'
            }
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: this.sensor1Name,
              color: '#6E3002'
            },
            ticks: {
              color: '#6E3002'
            },
            grid: {
              color: '#6E300233'
            }
          },
          y: {
            title: {
              display: true,
              text: this.sensor2Name,
              color: '#6E3002'
            },
            ticks: {
              color: '#6E3002'
            },
            grid: {
              color: '#6E300233'
            }
          }
        }
      }
    });
  }

  updateScatterChart(): void {
    if (!this.chart) {
      this.createScatterChart();
      return;
    }

    const scatterData = this.dataPoints.map(dp => ({
      x: dp.sensor1,
      y: dp.sensor2,
    }));

    this.chart.data.datasets[0].data = scatterData;
    this.chart.update();
  }
}
