import { Routes } from '@angular/router';
import { HomeComponent } from './features/landing/pages/home/home.component';
import { ProjectpageComponent } from './features/landing/pages/projectpage/projectpage.component';
import { QueEsVermicompostaComponent } from './features/landing/components/que-es-vermicomposta/que-es-vermicomposta.component';
import { AppComoFuncionaComponent } from './features/landing/components/app-como-funciona/app-como-funciona.component';
export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'que-es-vermicomposta', component: QueEsVermicompostaComponent },
    {path: 'projectpage', component: ProjectpageComponent },
    {path: 'como-funciona', component: AppComoFuncionaComponent },
];

