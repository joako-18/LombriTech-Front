import { Component } from '@angular/core';
import { NavigateComponent } from "../../components/navigate/navigate.component";
import { GraphCardComponent } from '../../../../shared/components/graph-card/graph-card.component';

@Component({
  selector: 'app-vista-temperatura',
  imports: [NavigateComponent, GraphCardComponent],
  templateUrl: './vista-temperatura.component.html',
  styleUrl: './vista-temperatura.component.css'
})
export class VistaTemperaturaComponent {

  labels: string[] = [];
  phData: number[] = [];
  humedadData: number[] = [];

  getMultipleDataSets(ds: { label: string; data: number[]; color: string }[]) {
    return ds.map(e => ({ data: e.data, label: e.label, backgroundColor: e.color }));
  }

}
