import { TestBed } from '@angular/core/testing';

import { PersonsPromisesService } from './persons-promises.service';

describe('PersonsPromisesService', () => {
  let service: PersonsPromisesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersonsPromisesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
