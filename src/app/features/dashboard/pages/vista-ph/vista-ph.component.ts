import { Component } from '@angular/core';
import { NavigateComponent } from "../../components/navigate/navigate.component";
import { GraphCardComponent } from '../../../../shared/components/graph-card/graph-card.component';

@Component({
  selector: 'app-vista-ph',
  imports: [NavigateComponent, GraphCardComponent],
  templateUrl: './vista-ph.component.html',
  styleUrl: './vista-ph.component.css'
})
export class VistaPhComponent {
  labels: string[] = ['Muestra 1', 'Muestra 2', 'Muestra 3', 'Muestra 4', 'Muestra 5'];
  phData: number[] = [6.8, 7.1, 8.3, 7.6, 7.0];
  humedadData: number[] = [78, 82, 85, 80, 79];

  getMultipleDataSets(ds: { label: string; data: number[]; color: string }[]) {
    return ds.map(e => ({ data: e.data, label: e.label, backgroundColor: e.color }));
  }

  getHistogramDataSet(data: number[], color: string) {
    const bins = [6, 6.5, 7, 7.5, 8, 8.5];
    const counts = Array(bins.length - 1).fill(0);
    data.forEach(v => {
      for (let i = 0; i < bins.length - 1; i++) {
        if (v >= bins[i] && v < bins[i + 1]) {
          counts[i]++;
          break;
        }
      }
    });
    return [{ data: counts, label: 'Frecuencia', backgroundColor: color }];
  }

  getBoxplotDataSet(data: number[], color: string) {
    const sorted = [...data].sort((a, b) => a - b);
    const q1 = sorted[Math.floor((sorted.length / 4))];
    const median = sorted[Math.floor((sorted.length / 2))];
    const q3 = sorted[Math.floor((sorted.length * 3) / 4)];
    const min = sorted[0];
    const max = sorted[sorted.length - 1];

    return [{
      label: 'Boxplot',
      backgroundColor: color,
      data: [{
        min: min,
        q1: q1,
        median: median,
        q3: q3,
        max: max
      }]
    }];
  }
}
