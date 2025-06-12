import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AcercaDeComponent } from './pages/acerca-de/acerca-de.component';
import { ConfiguracionComponent } from './pages/configuracion/configuracion.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EstadisticasComponent } from './pages/estadisticas/estadisticas.component';
import { HomeDashboardComponent } from './pages/home-dashboard/home-dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'acerca-de', component: AcercaDeComponent },
    { path: 'configuracion', component: ConfiguracionComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'estadisticas', component: EstadisticasComponent },
    { path: 'home-dashboard', component: HomeDashboardComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent }
];

