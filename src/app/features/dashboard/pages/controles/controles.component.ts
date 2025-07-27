import { Component } from '@angular/core';
import { NavigateComponent } from "../../components/navigate/navigate.component";
import { RealTimeCardComponent } from '../../../../shared/components/real-time-card/real-time-card.component';
import { ControlSensorComponent } from '../../components/control-sensor/control-sensor.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EstadisticasService } from '../../../../core/services/estadisticas.service';

@Component({
  selector: 'app-controles',
  standalone: true,
  imports: [NavigateComponent, RealTimeCardComponent, ControlSensorComponent, CommonModule, FormsModule ],
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

  constructor(private estadisticasService: EstadisticasService) {}

  ngOnInit(): void {
  this.estadisticasService.connect();

  this.estadisticasService.getEstadisticas().subscribe((data) => {
    // ⬇️ Asigna valores individuales
    const valores = data?.valores_individuales;
    if (valores) {
      this.humedadValue = valores['humedad'] ?? 0;
      this.conductividadValue = valores['tds'] ?? 0; // o valores['conductividad'] si así viene
      this.temperaturaValue = valores['temperatura'] ?? 0;
      this.phValue = valores['ph'] ?? 0;
      this.turbidezValue = valores['sst'] ?? 0;
    }

  });

}
}
