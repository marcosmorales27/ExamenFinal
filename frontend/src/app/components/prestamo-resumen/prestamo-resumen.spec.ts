import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoResumen } from './prestamo-resumen';

describe('PrestamoResumen', () => {
  let component: PrestamoResumen;
  let fixture: ComponentFixture<PrestamoResumen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrestamoResumen],
    }).compileComponents();

    fixture = TestBed.createComponent(PrestamoResumen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
