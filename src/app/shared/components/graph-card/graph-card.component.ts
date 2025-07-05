import { Component, Input } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-graph-card',
  templateUrl: './graph-card.component.html',
  styleUrls: ['./graph-card.component.css'],
  standalone: true,
  imports: [NgChartsModule, CommonModule]
})
export class GraphCardComponent {
  @Input() title: string = 'Gráfica';
  @Input() labels: string[] = [];
  @Input() datasets: ChartConfiguration<'bar'>['data']['datasets'] = [];
  @Input() bgColor: string = '#fff';

  public chartType: ChartType = 'bar';

  public chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      labels: {
        color: 'white'  // ❄️ Color de texto en la leyenda
      }
    }
  },
  scales: {
    x: {
      ticks: {
        color: 'white'  // ❄️ Color etiquetas eje X
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.2)'  // ❄️ Líneas de cuadrícula eje X
      }
    },
    y: {
      ticks: {
        color: 'white'  // ❄️ Color etiquetas eje Y
      },
      grid: {
        color: 'rgba(255, 255, 255, 0.2)'  // ❄️ Líneas de cuadrícula eje Y
      }
    }
  }
};

}
