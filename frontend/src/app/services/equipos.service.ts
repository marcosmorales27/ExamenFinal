import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Equipo } from '../models/equipo.model';
import { Prestamo, NuevoPrestamo } from '../models/prestamo.model';
import { firstValueFrom } from 'rxjs';

const API_URL = 'http://localhost:3000/api';

@Injectable({ providedIn: 'root' })
export class EquiposService {
  // Estado central reactivo
  private _equipos = signal<Equipo[]>([]);
  private _prestamos = signal<Prestamo[]>([]);
  private _equipoSeleccionado = signal<Equipo | null>(null);
  private _cargando = signal<boolean>(false);
  private _error = signal<string | null>(null);

  // Exponer como readonly para que los componentes no muten directamente
  equipos = this._equipos.asReadonly();
  prestamos = this._prestamos.asReadonly();
  equipoSeleccionado = this._equipoSeleccionado.asReadonly();
  cargando = this._cargando.asReadonly();
  error = this._error.asReadonly();

  // Computed: derivados automáticos, útiles para el resumen / badges
  equiposDisponibles = computed(() =>
    this._equipos().filter(e => e.estado === 'disponible')
  );

  totalPrestamosActivos = computed(() => this._prestamos().length);

  constructor(private http: HttpClient) {}

  async cargarEquipos() {
    this._cargando.set(true);
    this._error.set(null);
    try {
      const data = await firstValueFrom(
        this.http.get<Equipo[]>(`${API_URL}/equipos`)
      );
      this._equipos.set(data);
      this.guardarCacheOffline(data); // para PARTE 4 (PWA offline)
    } catch (err: any) {
      this._error.set('No se pudo conectar al servidor. Mostrando datos guardados.');
      this.cargarCacheOffline();
    } finally {
      this._cargando.set(false);
    }
  }

  async cargarPrestamos() {
    try {
      const data = await firstValueFrom(
        this.http.get<Prestamo[]>(`${API_URL}/prestamos`)
      );
      this._prestamos.set(data);
    } catch (err) {
      console.error('Error al cargar préstamos', err);
    }
  }

  seleccionarEquipo(equipo: Equipo | null) {
    this._equipoSeleccionado.set(equipo);
  }

  async registrarPrestamo(nuevoPrestamo: NuevoPrestamo): Promise<boolean> {
    try {
      await firstValueFrom(
        this.http.post(`${API_URL}/prestamos`, nuevoPrestamo)
      );
      // Refrescar ambos estados para mantener todo sincronizado
      await this.cargarEquipos();
      await this.cargarPrestamos();
      this._equipoSeleccionado.set(null);
      return true;
    } catch (err: any) {
      this._error.set(err?.error?.error || 'Error al registrar el préstamo');
      return false;
    }
  }

  async eliminarPrestamo(id: number): Promise<boolean> {
    try {
      await firstValueFrom(this.http.delete(`${API_URL}/prestamos/${id}`));
      await this.cargarEquipos();
      await this.cargarPrestamos();
      return true;
    } catch (err) {
      this._error.set('Error al eliminar el préstamo');
      return false;
    }
  }

  // --- Persistencia local para modo offline (usada en PARTE 4) ---
  private guardarCacheOffline(equipos: Equipo[]) {
    localStorage.setItem('equipos_cache', JSON.stringify(equipos));
  }

  private cargarCacheOffline() {
    const cache = localStorage.getItem('equipos_cache');
    if (cache) {
      this._equipos.set(JSON.parse(cache));
    }
  }
}