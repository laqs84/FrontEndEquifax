import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarexcelComponent } from './cargarexcel.component';

describe('CargarexcelComponent', () => {
  let component: CargarexcelComponent;
  let fixture: ComponentFixture<CargarexcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarexcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarexcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
