import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollBodyComponent } from './scroll-body.component';

describe('ScrollBodyComponent', () => {
  let component: ScrollBodyComponent;
  let fixture: ComponentFixture<ScrollBodyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollBodyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
