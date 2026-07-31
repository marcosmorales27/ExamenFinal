import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposList } from './equipos-list';

describe('EquiposList', () => {
  let component: EquiposList;
  let fixture: ComponentFixture<EquiposList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquiposList],
    }).compileComponents();

    fixture = TestBed.createComponent(EquiposList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
