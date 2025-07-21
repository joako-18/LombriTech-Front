import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-inicio',
  standalone: true, // Asegúrate de que este componente sea standalone
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-inicio.component.html',
  styleUrl: './modal-inicio.component.css'
})
export class ModalInicioComponent {
  @Input() title: string = 'Muestreo - 01';
  @Input() showModal: boolean = false;

  // Actualizamos el Output para incluir las nuevas propiedades
  @Output() initiateSampling = new EventEmitter<{
    description: string,
    worms: number,
    wormsUnit: string, // Nueva propiedad
    wormType: string,  // Nueva propiedad
  }>();
  @Output() closeModal = new EventEmitter<void>();

  description: string = '';
  wormsQuantity: number | null = null;
  wormsUnit: string = 'Kg'; // Valor por defecto
  wormType: string = ''; // Valor por defecto
  compostQuantity: number | null = null;

  // Opciones para las unidades de lombrices
  wormsUnits: string[] = ['Kg', 'g', 'Libras', 'Oz'];

  // Tipos de lombrices comunes para vermicompostaje
  commonWormTypes: string[] = [
    'C. Roja', // Eisenia fetida
    'Lombriz Roja Californiana', // Eisenia andrei
    'Lombriz Tigre', // Eisenia hortensis (Dendrobaena veneta)
    'Lombriz Azul Africana', // Eudrilus eugeniae
    'Lombriz Europea de Estiércol' // Lumbricus rubellus
  ];


  onInitiate(): void {
    if (this.description && this.wormsQuantity !== null && this.wormType) {
      this.initiateSampling.emit({
        description: this.description,
        worms: this.wormsQuantity,
        wormsUnit: this.wormsUnit, // Emitimos la unidad
        wormType: this.wormType   // Emitimos el tipo de lombriz
      });
      this.resetForm();
      this.showModal = false;
    } else {
      console.warn('Por favor, rellene todos los campos antes de iniciar el muestreo.');
      // Opcional: mostrar un mensaje al usuario en la interfaz
      alert('Por favor, rellene todos los campos antes de iniciar el muestreo.');
    }
  }

  private resetForm(): void {
    this.description = '';
    this.wormsQuantity = null;
    this.wormsUnit = 'Kg'; // Reseteamos a valor por defecto
    this.wormType = '';    // Reseteamos a valor por defecto
  }

  onClose(): void {
    this.resetForm();
    this.showModal = false;
    this.closeModal.emit();
  }
}