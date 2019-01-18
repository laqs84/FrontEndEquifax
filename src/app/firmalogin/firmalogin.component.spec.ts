import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirmaloginComponent } from './firmalogin.component';

describe('FirmaloginComponent', () => {
  let component: FirmaloginComponent;
  let fixture: ComponentFixture<FirmaloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirmaloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirmaloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
