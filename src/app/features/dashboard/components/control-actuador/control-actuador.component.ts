import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-control-actuador',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './control-actuador.component.html',
  styleUrls: ['./control-actuador.component.css']
})
export class ControlActuadorComponent {
  nivelAgua: number = 60;
  aspersoresActivos: boolean = true;
  estadoAspersor: boolean = true;
}
