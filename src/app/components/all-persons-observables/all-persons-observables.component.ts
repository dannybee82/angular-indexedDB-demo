import { Component, inject, OnInit } from '@angular/core';
import { PersonsObservablesService } from '../../services/persons/persons-observables.service';
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
  selector: 'app-all-persons-observables',
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
export class AllPersonsObservablesComponent extends AllPersonsShared implements OnInit, AllPersonsSharedInterface {

  private personsService = inject(PersonsObservablesService);
  
  override ngOnInit(): void {
    super.ngOnInit();    

    this.personsService.initDB().subscribe({
      next: () => {
        this.toastr.success('indexedDB initialized');        
      },
      error: (err) => {
        this.toastr.error('Can\'t initialize indexedDB');
      },
      complete: () => {
        this.getAllPersons();
      }
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
     this.personsService.deleteItem(id).subscribe({
      next: () => {
        this.toastr.success('Person deleted');
      },
      error: (err) => {
        this.toastr.error('Can\'t delete person');
      },
      complete: () => {
        this.getAllPersons();
      }
     });
  }
    
  private getAllPersons(): void {
    this.personsService.getItems<Person>().subscribe({
      next: (persons: Person[]) => {
        this.allPersons.set(persons);
      },
      error: (err) => {
        this.toastr.error('Can\'t get persons from indexedDB');
      }
    });
  } 

  private addPerson(person: Person): void {
    this.personsService.addItem(person).subscribe({
      next: () => {
        this.toastr.success('Person added');
      },
      error: () => {
        this.toastr.error('Can\'t add person');
      },
      complete: () => {
        this.resetForm();
        this.getAllPersons();
      }
    });        
  }

  private updatePerson(person: Person): void {
    this.personsService.updateItem(person).subscribe({
      next: () => {
        this.toastr.success('Person updated');
      },
      error: () => {
        this.toastr.error('Can\'t update person');    
      },
      complete: () => {
        this.resetForm();
        this.isUpdateMode.set(false);
        this._personToUpdate.set(undefined);
        this.getAllPersons();
      }
    });
  }

}