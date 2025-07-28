import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-informativo',
  imports: [CommonModule],
  templateUrl: './modal-informativo.component.html',
  styleUrls: ['./modal-informativo.component.css']
})
export class ModalInformativoComponent {
  @Input() mensaje: string = '';
  @Input() visible: boolean = false;
}
