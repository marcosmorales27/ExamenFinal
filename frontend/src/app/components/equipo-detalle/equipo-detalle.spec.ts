import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipoDetalle } from './equipo-detalle';

describe('EquipoDetalle', () => {
  let component: EquipoDetalle;
  let fixture: ComponentFixture<EquipoDetalle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipoDetalle],
    }).compileComponents();

    fixture = TestBed.createComponent(EquipoDetalle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
