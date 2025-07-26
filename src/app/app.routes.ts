import { Routes } from '@angular/router';
import { HomeComponent } from './features/landing/pages/home/home.component';
import { ProjectpageComponent } from './features/landing/pages/projectpage/projectpage.component';
import { AppComoFuncionaComponent } from './features/landing/components/app-como-funciona/app-como-funciona.component';
import { BeneficiosComponent } from './features/landing/components/beneficios/beneficios.component';
import { ProyectoComponent } from './features/landing/components/proyecto/proyecto.component';
import { QuienSomosComponent } from './features/landing/pages/quien-somos/quien-somos.component';
import { UserAlertComponent } from './shared/components/user-alert/user-alert.component';
import { LoginComponent } from './features/user/pages/login/login.component';
import { HomeDashboardComponent } from './features/dashboard/pages/home-dashboard/home-dashboard.component';
import { VistaConductividadComponent } from './features/dashboard/pages/vista-conductividad/vista-conductividad.component';
import { VistaTemperaturaComponent } from './features/dashboard/pages/vista-temperatura/vista-temperatura.component';
import { VistaHumedadComponent } from './features/dashboard/pages/vista-humedad/vista-humedad.component';
import { VistaPhComponent } from './features/dashboard/pages/vista-ph/vista-ph.component';
import { VistaAdminComponent } from './features/dashboard/pages/vista-admin/vista-admin.component';
import { RegistroComponent } from './features/dashboard/components/registro/registro.component';
import { ControlesComponent } from './features/dashboard/pages/controles/controles.component';
import { ConfiguracionComponent } from './features/dashboard/pages/configuracion/configuracion.component';
import { VistaErrorComponent } from './shared/components/vista-error/vista-error.component';
import { VistaTurbidezComponent } from './features/dashboard/pages/vista-turbidez/vista-turbidez.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    {path: 'projectpage', component: ProjectpageComponent },
    {path: 'como-funciona', component: AppComoFuncionaComponent },
    {path: 'beneficios', component: BeneficiosComponent },
    {path: 'proyecto', component: ProyectoComponent },
    {path: 'quien-somos', component: QuienSomosComponent },
    {path: 'user-alert', component: UserAlertComponent },
    {path: 'login', component: LoginComponent },
    {path: 'home-dashboard', component: HomeDashboardComponent },
    {path: 'registro', component: RegistroComponent },
    {path: 'vista-conductividad', component: VistaConductividadComponent },
    {path: 'vista-temperatura', component: VistaTemperaturaComponent },
    {path: 'vista-humedad', component: VistaHumedadComponent },
    {path: 'vista-ph', component: VistaPhComponent },
    {path: 'vista-admin', component: VistaAdminComponent },
    {path: 'vista-controles', component: ControlesComponent },
    {path: 'configuracion', component: ConfiguracionComponent },
    {path: 'vista-error', component: VistaErrorComponent },
    {path: 'vista-turbidez', component: VistaTurbidezComponent },
    {
    path: 'home-dashboard',
    component: HomeDashboardComponent,
    canActivate: [AuthGuard],
    data: { roles: ['admin', 'alumno'] }
    },
    {
        path: 'registro',
        component: RegistroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    },
    {
        path: 'vista-conductividad',
        component: VistaConductividadComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin', 'alumno'] }
    },
    {
        path: 'vista-temperatura',
        component: VistaTemperaturaComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin', 'alumno'] }
    },
    {
        path: 'vista-humedad',
        component: VistaHumedadComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin', 'alumno'] }
    },
    {
        path: 'vista-ph',
        component: VistaPhComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin', 'alumno'] }
    },
    {
        path: 'vista-admin',
        component: VistaAdminComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin'] } // solo admin
    },
    {
        path: 'vista-controles',
        component: ControlesComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin', 'alumno'] }
    },
    {
        path: 'configuracion',
        component: ConfiguracionComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin', 'alumno'] }
    },
    {
        path: 'vista-error',
        component: VistaErrorComponent
    },
    {
        path: 'vista-turbidez',
        component: VistaTurbidezComponent,
        canActivate: [AuthGuard],
        data: { roles: ['admin', 'alumno'] }
    },
];
