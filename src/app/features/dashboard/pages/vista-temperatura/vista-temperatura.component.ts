import { Component, OnInit } from '@angular/core';
import { NavigateComponent } from "../../components/navigate/navigate.component";
import { TimeSeriesGraphsComponent } from '../../components/time-series-graphs/time-series-graphs.component';
import { HistogramaCardComponent } from '../../components/histograma-card/histograma-card.component';
import { DonutChartComponent } from '../../components/donut-chart/donut-chart.component';
import { EstadisticasService } from '../../../../core/services/estadisticas.service';

@Component({
  selector: 'app-vista-temperatura',
  imports: [NavigateComponent, TimeSeriesGraphsComponent, HistogramaCardComponent, DonutChartComponent],
  templateUrl: './vista-temperatura.component.html',
  styleUrl: './vista-temperatura.component.css'
})
export class VistaTemperaturaComponent implements OnInit {
  temperaturaSeriesData: { timestamp: string; value: number }[] = [];
  histoLabels: string[] = [];
  histoValues: number[] = [];
  donutLabels: string[] = [];
  donutData: number[] = [];
  donutColors: string[] = ['#f87171', '#60a5fa', '#34d399'];

  constructor(private estadisticasService: EstadisticasService) {}

  ngOnInit(): void {
    this.estadisticasService.connect();

    this.estadisticasService.getEstadisticas().subscribe(data => {
      if (data?.series_temporales?.temperatura) {
        this.temperaturaSeriesData = data.series_temporales.temperatura;
        console.log('Datos de temperatura recibidos:', this.temperaturaSeriesData)
      }

      if (data?.histogramas?.temperatura) {
        this.histoLabels = data.histogramas.temperatura.labels;
        this.histoValues = data.histogramas.temperatura.values;
        console.log('Histograma temperatura:', this.histoLabels, this.histoValues);
      }

      if (data?.clasificaciones?.temperatura) {
        const clasifObj = data.clasificaciones.temperatura;
        this.donutLabels = Object.keys(clasifObj);
        this.donutData = Object.values(clasifObj);
        console.log('Clasificaciones de temperatura:', this.donutLabels, this.donutData);
      }
    });
  }
}
