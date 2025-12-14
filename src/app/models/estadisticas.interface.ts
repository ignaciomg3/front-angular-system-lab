export interface AnalisisPorCliente {
  cantidad: number;
  cliente: string;
  porcentaje: number;
}

export interface EstadisticasAnalisisResponse {
  success: boolean;
  totalAnalisis: number;
  analisisPorCliente: AnalisisPorCliente[];
}
