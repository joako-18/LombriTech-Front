import { Component } from '@angular/core';
import { NavigateComponent } from "../../components/navigate/navigate.component";
import { TimeSeriesGraphsComponent } from '../../components/time-series-graphs/time-series-graphs.component';
import { HistogramaCardComponent } from '../../components/histograma-card/histograma-card.component';
import { DonutChartComponent } from '../../components/donut-chart/donut-chart.component';

@Component({
  selector: 'app-vista-ph',
  imports: [NavigateComponent, TimeSeriesGraphsComponent, HistogramaCardComponent, DonutChartComponent],
  templateUrl: './vista-ph.component.html',
  styleUrl: './vista-ph.component.css'
})
export class VistaPhComponent {
  labels: string[] = ['0-200', '201-400', '401-600', '601-800', '801-1000'];
  phData: number[] = [2, 6, 10, 4, 1]; // Ejemplo de datos
  humedadData: number[] = [1, 2, 1, 1, 0]; // Ejemplo de datos

  getMultipleDataSets(ds: { label: string; data: number[]; color: string }[]) {
    return ds.map(e => ({
      data: e.data,
      label: e.label,
      backgroundColor: e.color
    }));
  }
}
