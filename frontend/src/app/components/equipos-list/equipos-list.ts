import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EquiposService } from '../../services/equipos.service';
import { Equipo } from '../../models/equipo.model';

@Component({
  selector: 'app-equipos-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './equipos-list.html',
  styleUrl: './equipos-list.scss'
})
export class EquiposListComponent implements OnInit {
  equiposService = inject(EquiposService);

  ngOnInit() {
    this.equiposService.cargarEquipos();
    this.equiposService.cargarPrestamos();
  }

  seleccionar(equipo: Equipo) {
    if (equipo.estado !== 'disponible') return;
    this.equiposService.seleccionarEquipo(equipo);
  }

  claseBadge(estado: string): string {
    switch (estado) {
      case 'disponible': return 'bg-success';
      case 'prestado': return 'bg-danger';
      case 'mantenimiento': return 'bg-warning text-dark';
      default: return 'bg-secondary';
    }
  }

  iconoEstado(estado: string): string {
    switch (estado) {
      case 'disponible': return 'bi-check-circle-fill';
      case 'prestado': return 'bi-x-circle-fill';
      case 'mantenimiento': return 'bi-tools';
      default: return 'bi-question-circle';
    }
  }
}