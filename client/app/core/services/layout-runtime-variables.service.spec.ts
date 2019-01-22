import { TestBed, inject } from '@angular/core/testing';

import { LayoutRuntimeVariablesService } from './layout-runtime-variables.service';

describe('RuntimeVariablesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LayoutRuntimeVariablesService]
    });
  });

  it('should be created', inject([LayoutRuntimeVariablesService], (service: LayoutRuntimeVariablesService) => {
    expect(service).toBeTruthy();
  }));
});
