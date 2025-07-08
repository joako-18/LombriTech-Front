import { Component } from '@angular/core';
import { NavigateComponent } from '../../components/navigate/navigate.component';

@Component({
  selector: 'app-configuracion',
  imports: [NavigateComponent],
  templateUrl: './configuracion.component.html',
  styleUrl: './configuracion.component.css'
})
export class ConfiguracionComponent {

  nombre: string = 'joaquin esau perez diaz';
  correo: string = 'joaquin@example.com';
  numeroTelegram: string = '@joaquin';
  rol: string = 'administrador';
  direccionCorreo: string = 'joaquin@example.com';
}
