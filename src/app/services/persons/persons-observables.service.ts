import { Injectable } from '@angular/core';
import { Person } from '../../models/person.interfase';
import { IndexedDBObservables } from '../generics/indexed-db-observables.abstract.class';

@Injectable({
  providedIn: 'root'
})
export class PersonsObservablesService extends IndexedDBObservables<Person> {

  constructor() { 
    super('personDatabase', 'persons', 1);
  }

}