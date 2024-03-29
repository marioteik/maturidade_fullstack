import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarCardComponent } from './calendar-card.component';

describe('HeaderCalendarCardComponent', () => {
  let component: CalendarCardComponent;
  let fixture: ComponentFixture<CalendarCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalendarCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
