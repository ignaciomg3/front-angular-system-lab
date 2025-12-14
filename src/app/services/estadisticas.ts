import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EstadisticasAnalisisResponse } from '../models/estadisticas.interface';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {
  private readonly API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene el porcentaje de análisis por cliente
   */
  getPorcentajePorCliente(): Observable<EstadisticasAnalisisResponse> {
    return this.http.get<EstadisticasAnalisisResponse>(`${this.API_URL}/estadisticas/analisis/porcentaje-por-cliente`);
  }
}
