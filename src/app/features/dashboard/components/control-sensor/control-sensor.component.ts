import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AlertaService } from '../../../../core/services/alerta.service';

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
  
  valorMinimo: number = 0;
  valorMaximo: number = 0;
  intervalo: number = 10;

  constructor(private alertaService: AlertaService) {}

  guardarAlerta() {
    const alerta = {
      tipo_sensor: this.sensor.toLowerCase(),
      valor_minimo: this.valorMinimo,
      valor_maximo: this.valorMaximo,
      intervalo: this.intervalo,
      composta_id: 1
    };

    this.alertaService.guardarConfiguracion(alerta).subscribe({
      next: () => console.log('Alerta guardada correctamente'),
      error: err => console.error('Error al guardar la alerta', err)
    });
  }
}
