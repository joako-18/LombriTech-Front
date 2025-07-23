import { Component, OnInit } from '@angular/core';
import { NavigateComponent } from "../../components/navigate/navigate.component";
import { TimeSeriesGraphsComponent } from '../../components/time-series-graphs/time-series-graphs.component';
import { HistogramaCardComponent } from '../../components/histograma-card/histograma-card.component';
import { DonutChartComponent } from '../../components/donut-chart/donut-chart.component';
import { EstadisticasService } from '../../../../core/services/estadisticas.service';
@Component({
  selector: 'app-vista-humedad',
  imports: [NavigateComponent, TimeSeriesGraphsComponent, HistogramaCardComponent, DonutChartComponent],
  templateUrl: './vista-humedad.component.html',
  styleUrl: './vista-humedad.component.css'
})
export class VistaHumedadComponent implements OnInit {
  humedadSeriesData: { timestamp: string; value: number }[] = [];
  histoLabels: string[] = [];
  histoValues: number[] = [];
  donutLabels: string[] = [];
  donutData: number[] = [];
  donutColors: string[] = ['#f87171', '#60a5fa', '#34d399'];


  constructor(private estadisticasService: EstadisticasService) {}

  ngOnInit(): void {
    this.estadisticasService.connect();

    this.estadisticasService.getEstadisticas().subscribe(data => {
      if (data?.series_temporales?.humedad) {
        this.humedadSeriesData = data.series_temporales.humedad;
        console.log('Datos de humedad recibidos:', this.humedadSeriesData);
      }

      if (data?.histogramas?.humedad){
        this.histoLabels = data.histogramas.humedad.labels;
        this.histoValues = data.histogramas.humedad.values;
        console.log('Histograma humedad:', this.histoLabels, this.histoValues);
      }

      if (data?.clasificaciones?.humedad){
        const clasifObj = data.clasificaciones.humedad;
        this.donutLabels = Object.keys(clasifObj);
        this.donutData = Object.values(clasifObj);
        console.log('Clasificaciones de humedad:', this.donutLabels, this.donutData);
      }
    });
  }
}
