export interface Analisis {
  _id: {
    $oid: string;
  };
  nro_informe: number;
  solicitante: string;
  fecha: string;
  responsable: string;
  estado: string;
  tipo_analisis: string;
}

export interface AnalisisResponse {
  analisis: Analisis[];
  total?: number;
}