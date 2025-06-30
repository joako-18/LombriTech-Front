import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './features/landing/components/header/header.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lombritech';

  constructor(private router: Router) {}

  showHeader() {
    // Oculta el header en rutas de login, registro y dashboard
    return !['/login', '/registro', '/dashboard'].includes(this.router.url);
  }
}