export interface Equipo {
  id: number;
  nombre: string;
  categoria: string;
  descripcion?: string;
  numero_serie: string;
  estado: 'disponible' | 'prestado' | 'mantenimiento';
  imagen_url?: string;
  created_at?: string;
}