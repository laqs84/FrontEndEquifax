import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailitemComponent } from './DetailitemComponent';

describe('DetailitemComponent', () => {
  let component: DetailitemComponent;
  let fixture: ComponentFixture<DetailitemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailitemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
