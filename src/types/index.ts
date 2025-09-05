export interface User {
  id: string;
  name: string;
  email: string;
  organizacion: {
    id: string;
    razonSocial: string;
    rut: string;
    telefono: string;
  };
  role: 'admin' | 'operador';
}

export interface Auto {
  id: string;
  patente: string;
  vin?: string;
  marca: string;
  modelo: string;
  año: number;
  color: string;
  kilometros?: number;
  notas?: string;
  documentos: {
    permiso: { fecha: string; vencimiento: string; vigente: boolean };
    rt: { fecha: string; vencimiento: string; vigente: boolean };
    soap: { fecha: string; vencimiento: string; vigente: boolean };
  };
  createdAt: string;
}

export interface Verificacion {
  id: string;
  patente: string;
  vin?: string;
  nombrePropietario?: string;
  email?: string;
  telefono?: string;
  fecha: string;
  resultado: 'sin_hallazgos' | 'alertas' | 'revision_recomendada';
  historialCriminal: {
    estado: 'sin_registros' | 'alertas' | 'sin_datos';
    detalle: string;
  };
  historialVehicular: {
    estado: 'sin_siniestros' | 'incidentes_menores' | 'falta_registros';
    detalle: string;
  };
  multiplesPropietarios: {
    cantidad: number;
    ultimoCambio: string;
    detalle: string;
  };
}

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message?: string;
  duration?: number;
}