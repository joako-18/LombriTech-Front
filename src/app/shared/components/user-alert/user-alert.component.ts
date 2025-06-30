import { Component,Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-user-alert',
  imports: [CommonModule],
  templateUrl: './user-alert.component.html',
  styleUrl: './user-alert.component.css'
})
export class UserAlertComponent {
@Input() isVisible: boolean = false;
  @Input() message: string = 'Te has registrado exitosamente!';
  @Input() buttonText: string = 'Aceptar';
  @Output() accept = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  onAccept() {
    this.accept.emit();
    this.close.emit();
  }

  onOverlayClick(event: Event) {
    this.close.emit();
  }
}
