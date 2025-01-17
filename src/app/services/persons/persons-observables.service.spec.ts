import { TestBed } from '@angular/core/testing';

import { PersonsObservablesService } from './persons-observables.service';

describe('PersonsObservablesService', () => {
  let service: PersonsObservablesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonsObservablesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
