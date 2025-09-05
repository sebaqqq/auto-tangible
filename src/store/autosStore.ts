import { create } from 'zustand';
import { Auto } from '../types';

interface AutosState {
  autos: Auto[];
  addAuto: (auto: Omit<Auto, 'id' | 'createdAt'>) => void;
  removeAuto: (id: string) => void;
  updateAuto: (id: string, updates: Partial<Auto>) => void;
  getAutoByPatente: (patente: string) => Auto | undefined;
  getAutoById: (id: string) => Auto | undefined;
}

// Mock data
const mockAutos: Auto[] = [
  {
    id: '1',
    patente: 'SZCJ29',
    vin: 'WBA3A5G54DNS12345',
    marca: 'BMW',
    modelo: 'Serie 3',
    año: 2020,
    color: 'Negro',
    kilometros: 45000,
    documentos: {
      permiso: { fecha: '15/03/24', vencimiento: '15/03/25', vigente: true },
      rt: { fecha: '20/02/24', vencimiento: '20/02/25', vigente: true },
      soap: { fecha: '10/01/24', vencimiento: '10/07/24', vigente: false },
    },
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    patente: 'ABC123',
    marca: 'Toyota',
    modelo: 'Corolla',
    año: 2019,
    color: 'Blanco',
    kilometros: 62000,
    documentos: {
      permiso: { fecha: '01/02/24', vencimiento: '01/02/25', vigente: true },
      rt: { fecha: '15/01/24', vencimiento: '15/01/25', vigente: true },
      soap: { fecha: '20/12/23', vencimiento: '20/06/24', vigente: false },
    },
    createdAt: '2023-12-01',
  },
  {
    id: '3',
    patente: 'XYZ789',
    marca: 'Chevrolet',
    modelo: 'Spark',
    año: 2018,
    color: 'Rojo',
    kilometros: 78000,
    documentos: {
      permiso: { fecha: '12/04/24', vencimiento: '12/04/25', vigente: true },
      rt: { fecha: '05/03/24', vencimiento: '05/03/25', vigente: true },
      soap: { fecha: '28/02/24', vencimiento: '28/08/24', vigente: true },
    },
    createdAt: '2023-11-20',
  },
];

export const useAutosStore = create<AutosState>((set, get) => ({
  autos: mockAutos,

  addAuto: (autoData) => {
    const newAuto: Auto = {
      ...autoData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    set({ autos: [...get().autos, newAuto] });
  },

  removeAuto: (id) => {
    set({ autos: get().autos.filter((auto) => auto.id !== id) });
  },

  updateAuto: (id, updates) => {
    set({
      autos: get().autos.map((auto) =>
        auto.id === id ? { ...auto, ...updates } : auto
      ),
    });
  },

  getAutoByPatente: (patente) => {
    return get().autos.find(
      (auto) => auto.patente.toLowerCase() === patente.toLowerCase()
    );
  },

  getAutoById: (id) => {
    return get().autos.find((auto) => auto.id === id);
  },
}));
