import { create } from 'zustand';
import { Verificacion } from '../types';

interface VerificacionesState {
  verificaciones: Verificacion[];
  addVerificacion: (verificacion: Omit<Verificacion, 'id'>) => void;
  getVerificacionesByPatente: (patente: string) => Verificacion[];
  verificarAuto: (data: VerificacionInput) => Verificacion;
}

interface VerificacionInput {
  patente: string;
  vin?: string;
  nombrePropietario?: string;
  email?: string;
  telefono?: string;
}

// Mock verificaciones
const mockVerificaciones: Verificacion[] = [
  {
    id: '1',
    patente: 'SZCJ29',
    fecha: '15/12/24',
    resultado: 'alertas',
    historialCriminal: {
      estado: 'alertas',
      detalle: '1 alerta leve asociada al vehículo'
    },
    historialVehicular: {
      estado: 'incidentes_menores',
      detalle: '2 incidentes menores, mantenciones regulares; posible inconsistencia de km'
    },
    multiplesPropietarios: {
      cantidad: 3,
      ultimoCambio: '12/06/24',
      detalle: '3 propietarios en 5 años'
    }
  },
  {
    id: '2',
    patente: 'ABC123',
    fecha: '10/12/24',
    resultado: 'sin_hallazgos',
    historialCriminal: {
      estado: 'sin_registros',
      detalle: 'Sin registros asociados'
    },
    historialVehicular: {
      estado: 'sin_siniestros',
      detalle: 'Sin siniestros reportados; mantenciones al día'
    },
    multiplesPropietarios: {
      cantidad: 1,
      ultimoCambio: '15/03/21',
      detalle: '1 propietario desde 2021'
    }
  }
];

// Reglas predeterminadas para verificación
const verificacionRules: Record<string, Omit<Verificacion, 'id' | 'patente' | 'fecha' | 'vin' | 'nombrePropietario' | 'email' | 'telefono'>> = {
  'SZCJ29': {
    resultado: 'alertas',
    historialCriminal: {
      estado: 'alertas',
      detalle: '1 alerta leve asociada al vehículo (reporte de uso en zona de riesgo)'
    },
    historialVehicular: {
      estado: 'incidentes_menores',
      detalle: '2 incidentes menores reportados, mantenciones regulares; posible inconsistencia de kilometraje'
    },
    multiplesPropietarios: {
      cantidad: 3,
      ultimoCambio: '12/06/24',
      detalle: '3 propietarios en los últimos 5 años (último cambio: 12/06/24)'
    }
  },
  'ABC123': {
    resultado: 'sin_hallazgos',
    historialCriminal: {
      estado: 'sin_registros',
      detalle: 'Sin registros criminales asociados al vehículo'
    },
    historialVehicular: {
      estado: 'sin_siniestros',
      detalle: 'Sin siniestros reportados; historial de mantenciones al día'
    },
    multiplesPropietarios: {
      cantidad: 1,
      ultimoCambio: '15/03/21',
      detalle: '1 propietario registrado desde marzo 2021'
    }
  }
};

export const useVerificacionesStore = create<VerificacionesState>((set, get) => ({
  verificaciones: mockVerificaciones,

  addVerificacion: (verificacionData) => {
    const newVerificacion: Verificacion = {
      ...verificacionData,
      id: Date.now().toString()
    };
    set({ verificaciones: [...get().verificaciones, newVerificacion] });
  },

  getVerificacionesByPatente: (patente) => {
    return get().verificaciones.filter(v => 
      v.patente.toLowerCase() === patente.toLowerCase()
    );
  },

  verificarAuto: (data) => {
    const patente = data.patente.toUpperCase();
    const today = new Date();
    const fecha = `${today.getDate().toString().padStart(2, '0')}/${(today.getMonth() + 1).toString().padStart(2, '0')}/${today.getFullYear().toString().slice(-2)}`;

    let resultado = verificacionRules[patente];
    
    if (!resultado) {
      // Fallback genérico para patentes no definidas
      resultado = {
        resultado: 'revision_recomendada',
        historialCriminal: {
          estado: 'sin_datos',
          detalle: 'Sin datos concluyentes disponibles'
        },
        historialVehicular: {
          estado: 'falta_registros',
          detalle: 'Falta de registros en una o más fuentes de verificación'
        },
        multiplesPropietarios: {
          cantidad: 2,
          ultimoCambio: '08/11/23',
          detalle: 'Información parcial disponible'
        }
      };
    }

    const verificacion: Verificacion = {
      ...data,
      ...resultado,
      id: Date.now().toString(),
      fecha
    };

    // Agregar al store
    get().addVerificacion(verificacion);
    
    return verificacion;
  }
}));