import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteLotesComponent } from './reporte-lotes.component';

describe('ReporteLotesComponent', () => {
  let component: ReporteLotesComponent;
  let fixture: ComponentFixture<ReporteLotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReporteLotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteLotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
