import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { Header } from './header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, Header],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Sistema de Laboratorio de Análisis');
}
