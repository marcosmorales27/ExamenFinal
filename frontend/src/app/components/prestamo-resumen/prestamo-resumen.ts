import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquiposService } from '../../services/equipos.service';

@Component({
  selector: 'app-prestamo-resumen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './prestamo-resumen.html',
  styleUrl: './prestamo-resumen.scss'
})
export class PrestamoResumenComponent {
  equiposService = inject(EquiposService);

  async eliminar(id: number) {
    if (confirm('¿Eliminar este préstamo y liberar el equipo?')) {
      await this.equiposService.eliminarPrestamo(id);
    }
  }
}