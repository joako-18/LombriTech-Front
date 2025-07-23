import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Es 'styleUrls' no 'styleUrl'
})
export class AppComponent {
  title = 'lombritech';

  constructor(private router: Router) {}

  showHeader(): boolean {
    // Retorna true si la ruta actual NO está en esta lista para mostrar el header
    const hiddenRoutes = [
      '/login', 
      '/home-dashboard', 
      '/vista-conductividad',
      '/vista-temperatura', 
      '/vista-humedad', 
      '/vista-ph',
      '/vista-admin',
      '/configuracion', 
      '/vista-controles', 
      '/vista-error', 
      '/vista-turbidez'
    ];
    return !hiddenRoutes.includes(this.router.url);
  }
}
