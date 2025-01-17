import { Injectable } from '@angular/core';
import { IndexedDBPromises } from '../generics/indexed-db-promises.abstract.class';
import { Person } from '../../models/person.interfase';

@Injectable({
  providedIn: 'root'
})
export class PersonsPromisesService  extends IndexedDBPromises<Person> {

  constructor() {
    super('personDatabase', 'persons', 1);
  }

}