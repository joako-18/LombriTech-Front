import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-control-sensor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './control-sensor.component.html',
  styleUrls: ['./control-sensor.component.css']
})
export class ControlSensorComponent {
  @Input() sensor: string = 'Humedad';
  @Input() bgColor: string = '#4682A9';
  sensorActivo: boolean = true;
}
