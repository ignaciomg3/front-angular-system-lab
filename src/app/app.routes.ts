import { Routes } from '@angular/router';
import { AnalisisComponent } from './analisis/analisis';

export const routes: Routes = [
  { path: '', redirectTo: '/analisis', pathMatch: 'full' },
  { path: 'analisis', component: AnalisisComponent },
  { path: '**', redirectTo: '/analisis' }
];
