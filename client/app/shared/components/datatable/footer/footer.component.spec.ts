import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatatableFooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: DatatableFooterComponent;
  let fixture: ComponentFixture<DatatableFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatatableFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatatableFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
