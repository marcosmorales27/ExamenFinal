export interface Prestamo {
  id: number;
  equipo_id: number;
  equipo_nombre?: string;
  nombre_solicitante: string;
  fecha_prestamo: string;
  fecha_devolucion_estimada?: string;
  fecha_devolucion_real?: string | null;
  observaciones?: string;
}

export interface NuevoPrestamo {
  equipo_id: number;
  nombre_solicitante: string;
  fecha_devolucion_estimada?: string;
  observaciones?: string;
}