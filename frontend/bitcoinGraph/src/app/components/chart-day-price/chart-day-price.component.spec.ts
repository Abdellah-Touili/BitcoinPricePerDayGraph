import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDayPriceComponent } from './chart-day-price.component';

describe('ChartDayPriceComponent', () => {
  let component: ChartDayPriceComponent;
  let fixture: ComponentFixture<ChartDayPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartDayPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartDayPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
