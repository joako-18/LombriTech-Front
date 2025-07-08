import { Component } from '@angular/core';
import { NavigateComponent } from "../../components/navigate/navigate.component";
import { RealTimeCardComponent } from '../../../../shared/components/real-time-card/real-time-card.component';
import { ControlSensorComponent } from '../../components/control-sensor/control-sensor.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ControlActuadorComponent } from '../../components/control-actuador/control-actuador.component';

@Component({
  selector: 'app-controles',
  standalone: true,
  imports: [NavigateComponent, RealTimeCardComponent, ControlSensorComponent, CommonModule, FormsModule, ControlActuadorComponent],
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

}
