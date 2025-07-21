import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-inicio',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-inicio.component.html',
  styleUrl: './modal-inicio.component.css'
})
export class ModalInicioComponent {
  @Input() title: string = 'Muestreo - 01';
  @Input() showModal: boolean = false;

  // ¡CORRECCIÓN AQUÍ! Eliminamos 'compost: number' del tipo emitido
  @Output() initiateSampling = new EventEmitter<{
    description: string,
    worms: number,
    wormsUnit: string,
    wormType: string,
  }>();
  @Output() closeModal = new EventEmitter<void>();

  description: string = '';
  wormsQuantity: number | null = null;
  wormsUnit: string = 'Kg';
  wormType: string = '';
  // ¡ELIMINADO AQUÍ! compostQuantity ya no es una propiedad
  // compostQuantity: number | null = null;

  // Opciones para las unidades de lombrices
  wormsUnits: string[] = ['Kg', 'g', 'Libras', 'Oz'];

  // Tipos de lombrices comunes para vermicompostaje
  commonWormTypes: string[] = [
    'C. Roja',
    'Lombriz Roja Californiana',
    'Lombriz Tigre',
    'Lombriz Azul Africana',
    'Lombriz Europea de Estiércol'
  ];

  onInitiate(): void {
    // ¡CORRECCIÓN AQUÍ! Validamos sin compostQuantity
    if (this.description && this.wormsQuantity !== null && this.wormType) {
      this.initiateSampling.emit({
        description: this.description,
        worms: this.wormsQuantity,
        wormsUnit: this.wormsUnit,
        wormType: this.wormType,
        // ¡ELIMINADO AQUÍ! Ya no emitimos compost
        // compost: this.compostQuantity
      });
      this.resetForm();
      this.showModal = false;
    } else {
      console.warn('Por favor, rellene todos los campos antes de iniciar el muestreo.');
      alert('Por favor, rellene todos los campos antes de iniciar el muestreo.');
    }
  }

  private resetForm(): void {
    this.description = '';
    this.wormsQuantity = null;
    this.wormsUnit = 'Kg';
    this.wormType = '';
    // ¡ELIMINADO AQUÍ! Ya no reseteamos compostQuantity
    // this.compostQuantity = null;
  }

  onClose(): void {
    this.resetForm();
    this.showModal = false;
    this.closeModal.emit();
  }
}