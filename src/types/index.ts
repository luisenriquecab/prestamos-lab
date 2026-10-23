export type CategoriaEquipo = 'Switch' | 'Cable de red' | 'Access Point';

export interface Equipo {
  id: number;
  nombre: string;
  categoria: CategoriaEquipo | string;
  disponible: boolean;
}

export interface Prestamo {
  id: number;
  equipoId: number;
  solicitante: string;
  carne: string;
  fechaPrestamo: string;   // ISO 8601
  fechaLimite: string;     // ISO 8601
  devuelto: boolean;
}