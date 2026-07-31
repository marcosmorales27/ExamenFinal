// src/app/app.ts (o app.component.ts según tu versión)
import { Component } from '@angular/core';
import { EquiposListComponent } from './components/equipos-list/equipos-list';
import { PrestamoFormComponent } from './components/prestamo-form/prestamo-form';
import { PrestamoResumenComponent } from './components/prestamo-resumen/prestamo-resumen';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [EquiposListComponent, PrestamoFormComponent, PrestamoResumenComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}