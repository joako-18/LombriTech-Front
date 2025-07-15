import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QueEsVermicompostaComponent } from '../que-es-vermicomposta/que-es-vermicomposta.component';
import { AppComoFuncionaComponent } from '../app-como-funciona/app-como-funciona.component';
import { BeneficiosComponent } from '../beneficios/beneficios.component';
import { ProyectoComponent } from '../proyecto/proyecto.component';

interface SlideComponent {
  title: string;
  description?: string;
  component: string;
}

@Component({
  selector: 'app-carousel-container',
  imports: [
    CommonModule,
    RouterModule,
    QueEsVermicompostaComponent,
    AppComoFuncionaComponent,
    BeneficiosComponent,
    ProyectoComponent,
  ],
  templateUrl: './carousel-container.component.html',
  styleUrl: './carousel-container.component.css'
})
export class CarouselContainerComponent implements OnInit, OnDestroy {
  @Input() infiniteLoop = true;
  @Input() enableKeyboardNavigation = true;
  @Input() showArrows = true;
  @Input() showIndicators = true;

  currentSlide = 0;

  components: SlideComponent[] = [
    {
      title: '¿Qué es la vermicomposta?',
      description: 'Descubre el proceso natural de reciclaje',
      component: 'que-es-vermicomposta'
    },
    {
      title: '¿Cómo funciona?',
      description: 'Proceso de vermicompostaje paso a paso',
      component: 'como-funciona'
    },
    {
      title: 'Beneficios',
      description: 'Ventajas del sistema LombriTech',
      component: 'beneficios'
    },
    {
      title: 'Proyecto',
      description: 'Conoce nuestro proyecto y objetivos',
      component: 'proyecto'
    }
  ];

  ngOnInit() {
    // Inicialización sin autoplay
    console.log('Carrusel inicializado con navegación manual');
  }

  ngOnDestroy() {
    // Limpieza si fuera necesaria
  }

  nextSlide() {
    if (this.currentSlide < this.components.length - 1) {
      this.currentSlide++;
    } else if (this.infiniteLoop) {
      this.currentSlide = 0;
    }
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else if (this.infiniteLoop) {
      this.currentSlide = this.components.length - 1;
    }
  }

  goToSlide(index: number) {
    if (index >= 0 && index < this.components.length) {
      this.currentSlide = index;
    }
  }

  // Navegación con teclado (opcional)
  onKeyDown(event: KeyboardEvent) {
    if (!this.enableKeyboardNavigation) return;
    
    switch(event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.previousSlide();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.nextSlide();
        break;
      case 'Home':
        event.preventDefault();
        this.goToSlide(0);
        break;
      case 'End':
        event.preventDefault();
        this.goToSlide(this.components.length - 1);
        break;
    }
  }

  // Métodos públicos para control externo
  public goTo(slideIndex: number) {
    this.goToSlide(slideIndex);
  }

  public next() {
    this.nextSlide();
  }

  public previous() {
    this.previousSlide();
  }

  // Getters para el template
  get isFirstSlide(): boolean {
    return this.currentSlide === 0;
  }

  get isLastSlide(): boolean {
    return this.currentSlide === this.components.length - 1;
  }

  get currentComponent(): SlideComponent {
    return this.components[this.currentSlide];
  }

  get canGoPrevious(): boolean {
    return this.infiniteLoop || !this.isFirstSlide;
  }

  get canGoNext(): boolean {
    return this.infiniteLoop || !this.isLastSlide;
  }
}