import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Muestra } from '../models/muestras.interface';

@Injectable({
  providedIn: 'root'
})
export class MuestrasService {
  private readonly API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todas las muestras con paginación
   * @param page Número de página (por defecto 1)
   * @param pageSize Registros por página (por defecto 10)
   */
  getMuestras(page: number = 1, pageSize: number = 10): Observable<Muestra[]> {
    return this.http.get<{success: boolean, count: number, data: Muestra[]}>(`${this.API_URL}/muestras/todas`, {
      params: {
        page: page.toString(),
        pageSize: pageSize.toString()
      }
    })
      .pipe(
        map(response => response.data)
      );
  }

  /**
   * Obtiene una muestra por número
   */
  getMuestraByNumero(nroMuestra: number): Observable<Muestra> {
    return this.http.get<Muestra>(`${this.API_URL}/muestras/${nroMuestra}`);
  }
}
