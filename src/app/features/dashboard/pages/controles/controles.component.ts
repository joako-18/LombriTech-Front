import { Component } from '@angular/core';
import { NavigateComponent } from "../../components/navigate/navigate.component";
import { RealTimeCardComponent } from '../../../../shared/components/real-time-card/real-time-card.component';
import { ControlSensorComponent } from '../../components/control-sensor/control-sensor.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstadisticasService } from '../../../../core/services/estadisticas.service';
import { ValoresRealesService } from '../../../../core/services/valores-reales.service';

@Component({
  selector: 'app-controles',
  standalone: true,
  imports: [
    NavigateComponent,
    RealTimeCardComponent,
    ControlSensorComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './controles.component.html',
  styleUrls: ['./controles.component.css']
})
export class ControlesComponent {

  tipoSensorSeleccionado: string = 'Humedad';

  colores: Record<string, string> = {
    Humedad: '#4682A9',
    Temperatura: '#e1533c',
    Conductividad: '#d79e39',
    Ph: '#217c61'
  };

  humedadValue = 0;
  conductividadValue = 0;
  temperaturaValue = 0;
  phValue = 0;
  turbidezValue = 0;

  constructor(private estadisticasService: EstadisticasService,
              private valoresRealesService: ValoresRealesService
  ) {}

  ngOnInit(): void {
  this.valoresRealesService.connect();
    this.valoresRealesService.getValores().subscribe((valores) => {
      this.humedadValue = this.actualizarSiCambio(this.humedadValue, valores.humedad);
      this.conductividadValue = this.actualizarSiCambio(this.conductividadValue, valores.tds);
      this.temperaturaValue = this.actualizarSiCambio(this.temperaturaValue, valores.temperatura);
      this.phValue = this.actualizarSiCambio(this.phValue, valores.ph);
      this.turbidezValue = this.actualizarSiCambio(this.turbidezValue, valores.sst);
      console.log('[HomeDashboard] Valores reales actualizados:', valores);
    });
}
private actualizarSiCambio(valorActual: number, nuevoValor: any): number {
    if (nuevoValor === undefined || nuevoValor === null || isNaN(nuevoValor)) {
      return valorActual;
    }
    return nuevoValor !== valorActual ? nuevoValor : valorActual;
  }
}
