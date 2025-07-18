import { Component } from '@angular/core';
import { NavigateComponent } from '../../components/navigate/navigate.component';
import { TimeSeriesGraphsComponent } from '../../components/time-series-graphs/time-series-graphs.component';
@Component({
  selector: 'app-vista-turbidez',
  imports: [NavigateComponent, TimeSeriesGraphsComponent],
  templateUrl: './vista-turbidez.component.html',
  styleUrl: './vista-turbidez.component.css'
})
export class VistaTurbidezComponent {
  labels: string[] = [];
  phData: number[] = [];
  humedadData: number[] = [];

  getMultipleDataSets(ds: { label: string; data: number[]; color: string }[]) {
    return ds.map(e => ({ data: e.data, label: e.label, backgroundColor: e.color }));
  }
}
