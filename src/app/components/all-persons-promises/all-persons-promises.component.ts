import { Component, inject, OnInit } from '@angular/core';
import { PersonsPromisesService } from '../../services/persons/persons-promises.service';
import { Person } from '../../models/person.interfase';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatLabel } from '@angular/material/form-field';
import { MatIconButton } from '@angular/material/button';
import { GoBackButtonComponent } from '../go-back-button/go-back-button.component';
import { AllPersonsShared } from '../shared/all-persons-shared.abstract.class';
import { AllPersonsSharedInterface } from '../shared/all-persons-shared.interface';

@Component({
  selector: 'app-all-persons-promises',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatButton,
    MatIconButton,
    MatIcon,
    MatLabel,
    MatFormField,
    MatInput,
    GoBackButtonComponent
  ],
  templateUrl: '../shared/all-persons-shared.component.html',
})
export class AllPersonsPromisesComponent extends AllPersonsShared implements OnInit, AllPersonsSharedInterface {

  private personsService = inject(PersonsPromisesService);

  override ngOnInit(): void {
    super.ngOnInit();

    this.personsService.initDB().then((db) => {
      if(db) {
        this.toastr.success('indexedDB initialized');   
        this.getAllPersons();
      }
    }).catch(() => {
      this.toastr.error('Can\'t initialize indexedDB');
    });
  }

  submit(): void {
    if(this.personForm.valid) {
      const person: Person = Object.assign(this.personForm.value);      

      if(this.isUpdateMode()) {
        person.id = this._personToUpdate()?.id ?? 0;
        this.updatePerson(person);
      } else {
        this.addPerson(person);
      }
    } else {
      this.toastr.error('Form invalid.');
    }
  }

  delete(id: number): void {
    this.personsService.deleteItem(id).then(() => {
      this.toastr.success('Person deleted');
      this.getAllPersons();
    }).catch(() => {
      this.toastr.error('Can\'t delete person');
    });
  }

  private getAllPersons(): void {
    this.personsService.getItems().then((persons: Person[]) => {
      this.allPersons.set(persons);
    }).catch(() => {
      this.toastr.error('Can\'t get persons from indexedDB');
    });
  }

  private addPerson(person: Person): void {
    this.personsService.addItem(person).then(data => {
      this.toastr.success('Person added');
      this.resetForm();
      this.getAllPersons();
    }).catch(() => {
      this.toastr.error('Can\'t add person');
    });
  }

  private updatePerson(person: Person): void {
    this.personsService.updateItem(person).then(data => {
      this.toastr.success('Person updated');
      this.isUpdateMode.set(false);
      this._personToUpdate.set(undefined);
      this.resetForm();
      this.getAllPersons();
    }).catch((err) => {
      this.toastr.error('Can\'t update person'); 
    });
  }

}