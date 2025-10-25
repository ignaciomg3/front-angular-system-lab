import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Analisis } from '../models/analisis.interface';

@Injectable({
  providedIn: 'root'
})
export class AnalisisService {
  private readonly API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los análisis
   */
  getAnalisis(): Observable<Analisis[]> {
    return this.http.get<Analisis[]>(`${this.API_URL}/analisis`);
  }

  /**
   * Obtiene un análisis por número de informe
   */
  getAnalisisByInforme(nroInforme: number): Observable<Analisis> {
    return this.http.get<Analisis>(`${this.API_URL}/analisis/${nroInforme}`);
  }
}
