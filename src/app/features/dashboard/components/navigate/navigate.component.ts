// navigate.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../user/services/auth.service';

@Component({
  selector: 'app-navigate',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navigate.component.html',
  styleUrls: ['./navigate.component.css']
})
export class NavigateComponent {
  sidebarOpen = false;
  mostrarEstadisticas = true;
  userRole: string | null = null;

  constructor(public router: Router, private authService: AuthService) {
    this.userRole = this.authService.getUserRole();
  }

  toggleSidebar(): void {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebar(): void {
    this.sidebarOpen = false;
  }

  toggleEstadisticas(): void {
    this.mostrarEstadisticas = !this.mostrarEstadisticas;
  }

  navigate(ruta: string): void {
    if (ruta === '/vista-admin' && this.userRole !== 'admin') {
      return; // evita navegación si no es admin
    }

    this.router.navigate([ruta]);
    this.closeSidebar();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
