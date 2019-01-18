import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarcedulasComponent } from './cargarcedulas.component';

describe('CargarcedulasComponent', () => {
  let component: CargarcedulasComponent;
  let fixture: ComponentFixture<CargarcedulasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargarcedulasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargarcedulasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
