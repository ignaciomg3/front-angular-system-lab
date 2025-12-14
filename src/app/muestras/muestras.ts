import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MuestrasService } from '../services/muestras';
import { Muestra } from '../models/muestras.interface';

@Component({
  selector: 'app-muestras',
  imports: [CommonModule],
  templateUrl: './muestras.html',
  styleUrl: './muestras.css',
})
export class MuestrasComponent implements OnInit {
  muestras: Muestra[] = [];
  loading = false;
  error: string | null = null;

  constructor(private muestrasService: MuestrasService) {}

  ngOnInit(): void {
    this.cargarMuestras();
  }

  cargarMuestras(): void {
    this.loading = true;
    this.error = null;

    this.muestrasService.getMuestras().subscribe({
      next: (data) => {
        this.muestras = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar muestras:', error);
        this.error = 'Error al cargar las muestras. Verifique que el servidor esté ejecutándose.';
        this.loading = false;
      }
    });
  }

  recargar(): void {
    this.cargarMuestras();
  }

  getProtocolo(muestra: Muestra): string {
    return muestra.parametros?.protocolo || 'N/A';
  }

  getParametrosKeys(parametros: any): string[] {
    if (!parametros) return [];
    return Object.keys(parametros).filter(key => key !== 'protocolo');
  }

  formatParametroKey(key: string): string {
    return key.replace(/_/g, ' ');
  }

  trackByMuestra(index: number, item: Muestra): string {
    return item._id;
  }
}
