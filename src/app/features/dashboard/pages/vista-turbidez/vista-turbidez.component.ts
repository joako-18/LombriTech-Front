import { Component, OnInit } from '@angular/core';
import { NavigateComponent } from '../../components/navigate/navigate.component';
import { TimeSeriesGraphsComponent } from '../../components/time-series-graphs/time-series-graphs.component';
import { HistogramaCardComponent } from '../../components/histograma-card/histograma-card.component';
import { DonutChartComponent } from '../../components/donut-chart/donut-chart.component';
import { EstadisticasService } from '../../../../core/services/estadisticas.service';
@Component({
  selector: 'app-vista-turbidez',
  imports: [NavigateComponent, TimeSeriesGraphsComponent, HistogramaCardComponent, DonutChartComponent],
  templateUrl: './vista-turbidez.component.html',
  styleUrl: './vista-turbidez.component.css'
})

export class VistaTurbidezComponent implements OnInit {
  turbidezSeriesData: { timestamp: string; value: number }[] = [];
  histoLabels: string[] = [];
  histoValues: number[] = [];
  donutLabels: string[] = [];
  donutData: number[] = [];
  donutColors: string[] = ['#f87171', '#60a5fa', '#34d399'];

  constructor(private estadisticasService: EstadisticasService) {}

  ngOnInit(): void {
    this.estadisticasService.connect();

    this.estadisticasService.getEstadisticas().subscribe(data => {
      if (data?.series_temporales?.sst) {
        this.turbidezSeriesData = data.series_temporales.sst;
        console.log('Datos de turbidez (sst) recibidos:', this.turbidezSeriesData);
      }

      if (data?.histogramas?.sst){
        this.histoLabels = data.histogramas.sst.labels;
        this.histoValues = data.histogramas.sst.values;
        console.log('Histograma turbidez:', this.histoLabels, this.histoValues);
      }

      if (data?.clasificaciones?.sst){
        const clasifObj = data.clasificaciones.sst;
        this.donutLabels = Object.keys(clasifObj);
        this.donutData = Object.values(clasifObj);
        console.log('Clasificaciones de turbidez:', this.donutLabels, this.donutData);
      }
    });
  }
}
