import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquiposService } from '../../services/equipos.service';

@Component({
  selector: 'app-prestamo-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './prestamo-form.html',
  styleUrl: './prestamo-form.scss'
})
export class PrestamoFormComponent {
  equiposService = inject(EquiposService);

  nombreSolicitante = signal('');
  fechaDevolucion = signal('');
  observaciones = signal('');
  enviando = signal(false);
  mensajeExito = signal<string | null>(null);

  async registrar() {
    const equipo = this.equiposService.equipoSeleccionado();
    if (!equipo || !this.nombreSolicitante().trim()) return;

    this.enviando.set(true);
    this.mensajeExito.set(null);

    const exito = await this.equiposService.registrarPrestamo({
      equipo_id: equipo.id,
      nombre_solicitante: this.nombreSolicitante().trim(),
      fecha_devolucion_estimada: this.fechaDevolucion() || undefined,
      observaciones: this.observaciones() || undefined
    });

    this.enviando.set(false);

    if (exito) {
      this.mensajeExito.set(`Préstamo registrado para "${equipo.nombre}"`);
      this.limpiarFormulario();
      setTimeout(() => this.mensajeExito.set(null), 4000);
    }
  }

  cancelar() {
    this.equiposService.seleccionarEquipo(null);
    this.limpiarFormulario();
  }

  private limpiarFormulario() {
    this.nombreSolicitante.set('');
    this.fechaDevolucion.set('');
    this.observaciones.set('');
  }
}