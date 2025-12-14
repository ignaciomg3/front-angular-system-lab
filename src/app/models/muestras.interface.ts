export interface Muestra {
  _id: string;
  nro_informe: number;
  nro_muestra: number;
  muestra_nombre: string;
  parametros: {
    protocolo?: string;
    [key: string]: any;
  };
}

export interface MuestrasResponse {
  success: boolean;
  count: number;
  data: Muestra[];
}
