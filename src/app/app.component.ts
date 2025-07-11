import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
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
    return !['/login', '/home-dashboard', '/vista-conductividad', 
      '/vista-temperatura', '/vista-humedad', '/vista-ph','/vista-admin', '/configuracion', '/vista-controles'].includes(this.router.url);

  }
}