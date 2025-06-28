import { Routes } from '@angular/router';
import { HomeComponent } from './features/landing/pages/home/home.component';
import { ProjectpageComponent } from './features/landing/pages/projectpage/projectpage.component';
import { RegistroComponent } from './features/user/pages/registro/registro.component';
import { UserAlertComponent } from './shared/components/user-alert/user-alert.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    {path: 'projectpage', component: ProjectpageComponent },
    {path: 'registro', component: RegistroComponent },
    {path: 'user-alert', component: UserAlertComponent },
];

