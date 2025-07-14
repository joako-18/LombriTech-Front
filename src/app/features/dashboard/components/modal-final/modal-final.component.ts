import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-final',
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-final.component.html',
  styleUrl: './modal-final.component.css'
})
export class ModalFinalComponent {
  @Input() title: string = 'Resultados del muestreo - 01';
  @Input() showModal: boolean = false;

  @Output() endSampling = new EventEmitter<{ worms: number, compost: number, leachate: number }>();
  @Output() closeModal = new EventEmitter<void>();

  wormsQuantity: number | null = null;
  compostQuantity: number | null = null;
  leachateQuantity: number | null = null;

  onEnd(): void {
    if (this.wormsQuantity !== null && this.compostQuantity !== null && this.leachateQuantity !== null) {
      this.endSampling.emit({
        worms: this.wormsQuantity,
        compost: this.compostQuantity,
        leachate: this.leachateQuantity
      });
      this.resetForm();
      this.showModal = false;
    } else {
      console.warn('Please fill all fields before ending sampling.');
    }
  }

  private resetForm(): void {
    this.wormsQuantity = null;
    this.compostQuantity = null;
    this.leachateQuantity = null;
  }

  onClose(): void {
    this.resetForm();
    this.showModal = false;
    this.closeModal.emit();
  }
}
