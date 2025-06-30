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
  component: string; // Identificador del componente
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
  @Input() autoplayDuration = 5000; 
  @Input() infiniteLoop = true; 
  @Input() pauseOnHover = true; 

  currentSlide = 0;
  isAutoplay = true;
  autoplayInterval: any;
  private progressInterval: any;
  progressWidth = 0;

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
    if (this.isAutoplay) {
      this.startAutoplay();
    }
  }

  ngOnDestroy() {
    this.stopAutoplay();
    this.stopProgress();
  }

  startAutoplay() {
    this.stopAutoplay(); 
    this.startProgress();
    
    this.autoplayInterval = setInterval(() => {
      this.nextSlide();
    }, this.autoplayDuration);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
    this.stopProgress();
  }

  startProgress() {
    this.stopProgress();
    this.progressWidth = 0;
    
    const updateInterval = 50; // Actualizar cada 50ms para suavidad
    const increment = (100 / this.autoplayDuration) * updateInterval;
    
    this.progressInterval = setInterval(() => {
      this.progressWidth += increment;
      if (this.progressWidth >= 100) {
        this.progressWidth = 100;
        this.stopProgress();
      }
    }, updateInterval);
  }

  stopProgress() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }

  resetProgress() {
    this.progressWidth = 0;
    if (this.isAutoplay) {
      this.startProgress();
    }
  }

  toggleAutoplay() {
    this.isAutoplay = !this.isAutoplay;
    if (this.isAutoplay) {
      this.startAutoplay();
    } else {
      this.stopAutoplay();
    }
  }

  nextSlide() {
    if (this.currentSlide < this.components.length - 1) {
      this.currentSlide++;
    } else if (this.infiniteLoop) {
      this.currentSlide = 0;
    }
    this.resetProgress();
  }

  previousSlide() {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else if (this.infiniteLoop) {
      this.currentSlide = this.components.length - 1;
    }
    this.resetProgress();
  }

  goToSlide(index: number) {
    if (index >= 0 && index < this.components.length) {
      this.currentSlide = index;
      this.resetProgress();
      
      if (this.isAutoplay) {
        this.startAutoplay();
      }
    }
  }

  onMouseEnter() {
    if (this.isAutoplay && this.pauseOnHover) {
      this.stopAutoplay();
    }
  }

  onMouseLeave() {
    if (this.isAutoplay && this.pauseOnHover) {
      this.startAutoplay();
    }
  }

  // Navegación con teclado
  onKeyDown(event: KeyboardEvent) {
    switch(event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.previousSlide();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.nextSlide();
        break;
      case ' ': // Espacebar
        event.preventDefault();
        this.toggleAutoplay();
        break;
    }
  }

  // Métodos públicos para control externo
  public pause() {
    this.isAutoplay = false;
    this.stopAutoplay();
  }

  public play() {
    this.isAutoplay = true;
    this.startAutoplay();
  }

  public goTo(slideIndex: number) {
    this.goToSlide(slideIndex);
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
}