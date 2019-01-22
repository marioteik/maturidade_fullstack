import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityTypesComponent } from './entity-types.component';

describe('EntitiesComponent', () => {
  let component: EntityTypesComponent;
  let fixture: ComponentFixture<EntityTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
