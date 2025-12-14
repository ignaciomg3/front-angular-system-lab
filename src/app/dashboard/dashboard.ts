import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EstadisticasService } from '../services/estadisticas';
import { AnalisisPorCliente } from '../models/estadisticas.interface';

interface ChartData {
  label: string;
  value: number;
  color: string;
  percentage?: number;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit {
  analisisPorCliente: ChartData[] = [];
  totalAnalisis = 0;
  loading = false;
  error: string | null = null;

  // Paleta de colores para los clientes
  private readonly COLORS = [
    '#0f3460', '#16213e', '#533483', '#7c3aed',
    '#3b82f6', '#8b5cf6', '#ec4899', '#f43f5e',
    '#14b8a6', '#10b981', '#84cc16', '#eab308',
    '#f97316', '#ef4444', '#6366f1', '#8b5cf6'
  ];

  constructor(private estadisticasService: EstadisticasService) {}

  ngOnInit(): void {
    this.cargarEstadisticas();
  }

  cargarEstadisticas(): void {
    this.loading = true;
    this.error = null;

    this.estadisticasService.getPorcentajePorCliente().subscribe({
      next: (response) => {
        this.totalAnalisis = response.totalAnalisis;
        this.analisisPorCliente = response.analisisPorCliente.map((item, index) => ({
          label: item.cliente,
          value: item.cantidad,
          color: this.COLORS[index % this.COLORS.length],
          percentage: item.porcentaje
        }));
        this.loading = false;
      },
      error: (error) => {
        console.error('Error al cargar estadísticas:', error);
        this.error = 'Error al cargar las estadísticas. Verifique que el servidor esté ejecutándose.';
        this.loading = false;
      }
    });
  }

  recargar(): void {
    this.cargarEstadisticas();
  }

  calculatePercentages(data: ChartData[]): void {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    data.forEach(item => {
      item.percentage = (item.value / total) * 100;
    });
  }

  getStrokeDasharray(percentage: number): string {
    const circumference = 2 * Math.PI * 40; // radio = 40
    return `${(percentage / 100) * circumference} ${circumference}`;
  }

  getStrokeDashoffset(data: ChartData[], index: number): string {
    const circumference = 2 * Math.PI * 40;
    let offset = -circumference / 4; // Empezar desde arriba
    
    for (let i = 0; i < index; i++) {
      offset -= (data[i].percentage! / 100) * circumference;
    }
    
    return offset.toString();
  }

  getTotal(data: ChartData[]): number {
    return data.reduce((total, item) => total + item.value, 0);
  }
}
