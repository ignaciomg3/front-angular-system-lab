import { Routes } from '@angular/router';
import { AnalisisComponent } from './analisis/analisis';
import { HomeComponent } from './home/home';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'analisis', component: AnalisisComponent },
  { path: '**', redirectTo: '/home' }
];
