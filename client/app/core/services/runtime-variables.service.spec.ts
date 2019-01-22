import { TestBed, inject } from '@angular/core/testing';

import { RuntimeVariablesService } from './runtime-variables.service';

describe('RuntimeVariablesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RuntimeVariablesService]
    });
  });

  it('should be created', inject([RuntimeVariablesService], (service: RuntimeVariablesService) => {
    expect(service).toBeTruthy();
  }));
});
