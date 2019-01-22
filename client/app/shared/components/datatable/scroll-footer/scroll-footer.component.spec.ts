import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollFooterComponent } from './scroll-footer.component';

describe('ScrollFooterComponent', () => {
  let component: ScrollFooterComponent;
  let fixture: ComponentFixture<ScrollFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
