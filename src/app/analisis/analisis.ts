import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalisisService } from '../services/analisis';
import { Analisis as AnalisisModel } from '../models/analisis.interface';

@Component({
  selector: 'app-analisis',
  imports: [CommonModule],
  templateUrl: './analisis.html',
  styleUrl: './analisis.css',
})
export class AnalisisComponent implements OnInit {
  analisis: AnalisisModel[] = [];
  loading = false;
  error: string | null = null;

  constructor(private analisisService: AnalisisService) {}

  ngOnInit(): void {
    this.cargarAnalisis();
  }

  cargarAnalisis(): void {
    this.loading = true;
    this.error = null;

    this.analisisService.getAnalisis().subscribe({
      next: (data) => {
        this.analisis = data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar análisis:', error);
        this.error = 'Error al cargar los análisis. Verifique que el servidor esté ejecutándose.';
        this.loading = false;
      }
    });
  }

  recargar(): void {
    this.cargarAnalisis();
  }

  getEstadoClase(estado: string): string {
    switch (estado.toLowerCase()) {
      case 'hecho':
        return 'estado-hecho';
      case 'pendiente':
        return 'estado-pendiente';
      case 'en proceso':
        return 'estado-proceso';
      default:
        return 'estado-default';
    }
  }

  trackByInforme(index: number, item: AnalisisModel): number {
    return item.nro_informe;
  }
}
