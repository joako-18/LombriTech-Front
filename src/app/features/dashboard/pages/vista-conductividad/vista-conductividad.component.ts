import { Component, OnInit } from '@angular/core';
import { NavigateComponent } from "../../components/navigate/navigate.component";
import { TimeSeriesGraphsComponent } from "../../components/time-series-graphs/time-series-graphs.component";
import { HistogramaCardComponent } from "../../components/histograma-card/histograma-card.component";
import { DonutChartComponent } from "../../components/donut-chart/donut-chart.component";
import { EstadisticasService } from "../../../../core/services/estadisticas.service";
@Component({
  selector: 'app-vista-conductividad',
  templateUrl: './vista-conductividad.component.html',
  styleUrl: './vista-conductividad.component.css',
  imports: [NavigateComponent, TimeSeriesGraphsComponent, HistogramaCardComponent, DonutChartComponent]
})
export class VistaConductividadComponent implements OnInit {
  ecData: { timestamp: string; value: number }[] = [];
  tdsData: { timestamp: string; value: number }[] = [];
  histoLabels: string[] = [];
  histoValues: number[] = [];
  donutLabels: string[] = [];
  donutData: number[] = [];
  donutColors: string[] = ['#f87171', '#60a5fa', '#34d399'];

 
  constructor(private estadisticasService: EstadisticasService) {}

  ngOnInit(): void {
    this.estadisticasService.connect();

    this.estadisticasService.getEstadisticas().subscribe((data: any) => {
      const series = data?.series_temporales;

      if (series) {
        this.ecData = Array.isArray(series.ec) ? series.ec : [];
        this.tdsData = Array.isArray(series.tds) ? series.tds : [];
      }

      if (data?.histogramas?.tds){
        this.histoLabels = data.histogramas.tds.labels;
        this.histoValues = data.histogramas.tds.values;
        console.log('Histograma TDS:', this.histoLabels, this.histoValues);
      }

      if (data?.clasificaciones?.tds){
        const clasiObj = data.clasificaciones.tds;
        this.donutLabels = Object.keys(clasiObj);
        this.donutData = Object.values(clasiObj);
        console.log('Clasificaciones TDS:', this.donutLabels, this.donutData);
      }
    });
  }
}
