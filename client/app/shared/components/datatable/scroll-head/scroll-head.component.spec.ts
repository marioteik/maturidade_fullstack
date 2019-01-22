import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollHeadComponent } from './scroll-head.component';

describe('ScrollHeadComponent', () => {
  let component: ScrollHeadComponent;
  let fixture: ComponentFixture<ScrollHeadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollHeadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
