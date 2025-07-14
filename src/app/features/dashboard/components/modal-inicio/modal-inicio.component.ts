import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-inicio',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-inicio.component.html',
  styleUrl: './modal-inicio.component.css'
})
export class ModalInicioComponent {
  @Input() title: string = 'Muestreo - 01';
  @Input() showModal: boolean = false;

  @Output() initiateSampling = new EventEmitter<{ description: string, worms: number, compost: number }>();
  @Output() closeModal = new EventEmitter<void>();

  description: string = '';
  wormsQuantity: number | null = null;
  compostQuantity: number | null = null;

  onInitiate(): void {
    if (this.description && this.wormsQuantity !== null && this.compostQuantity !== null) {
      this.initiateSampling.emit({
        description: this.description,
        worms: this.wormsQuantity,
        compost: this.compostQuantity
      });
      this.resetForm();
      this.showModal = false;
    } else {
      console.warn('Please fill all fields before initiating sampling.');
    }
  }

  private resetForm(): void {
    this.description = '';
    this.wormsQuantity = null;
    this.compostQuantity = null;
  }

  onClose(): void {
    this.resetForm();
    this.showModal = false;
    this.closeModal.emit();
  }
}
