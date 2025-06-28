import { Component,Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-alert-problem',
  imports: [CommonModule],
  templateUrl: './user-alert-problem.component.html',
  styleUrl: './user-alert-problem.component.css'
})
export class UserAlertProblemComponent {
@Input() isVisible: boolean = false;
  @Input() message: string = 'Hubo un problema!';
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
