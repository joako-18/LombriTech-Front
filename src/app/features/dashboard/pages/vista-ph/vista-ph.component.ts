import { Component, OnInit } from '@angular/core';
import { NavigateComponent } from "../../components/navigate/navigate.component";
import { TimeSeriesGraphsComponent } from '../../components/time-series-graphs/time-series-graphs.component';
import { HistogramaCardComponent } from '../../components/histograma-card/histograma-card.component';
import { DonutChartComponent } from '../../components/donut-chart/donut-chart.component';
import { EstadisticasService } from '../../../../core/services/estadisticas.service';
@Component({
  selector: 'app-vista-ph',
  imports: [NavigateComponent, TimeSeriesGraphsComponent, HistogramaCardComponent, DonutChartComponent],
  templateUrl: './vista-ph.component.html',
  styleUrl: './vista-ph.component.css'
})

export class VistaPhComponent implements OnInit {
  phSeriesData: { timestamp: string; value: number }[] = [];
  histoLabels: string[] = [];
  histoValues: number[] = [];
  donutLabels: string[] = [];
  donutData: number[] = [];
  donutColors: string[] = ['#f87171', '#60a5fa', '#34d399'];

  constructor(private estadisticasService: EstadisticasService) {}

  ngOnInit(): void {
    this.estadisticasService.connect();

    this.estadisticasService.getEstadisticas().subscribe(data => {
      if (data?.series_temporales?.ph) {
        this.phSeriesData = data.series_temporales.ph;
        console.log('Datos de PH recibidos:', this.phSeriesData);
      }

      if (data?.histogramas?.ph) {
        this.histoLabels = data.histogramas.ph.labels;
        this.histoValues = data.histogramas.ph.values;
        console.log('Histograma PH:', this.histoLabels, this.histoValues);
      }

      if (data?.clasificaciones?.ph){
        const clasiObj = data.clasificaciones.ph;
        this.donutLabels = Object.keys(clasiObj);
        this.donutData = Object.values(clasiObj);
        console.log('Clasificaciones de PH:', this.donutLabels, this.donutData);
      }
    });
  }
}
