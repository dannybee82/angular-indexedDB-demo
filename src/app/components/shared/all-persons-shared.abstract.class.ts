import { Component, inject, OnInit, signal, WritableSignal } from "@angular/core";
import { Person } from "../../models/person.interfase";
import { FormBuilder, FormGroup, UntypedFormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
    template: ''
})
export abstract class AllPersonsShared implements OnInit {

    protected allPersons: WritableSignal<Person[]> = signal([]);
    protected isUpdateMode: WritableSignal<boolean> = signal(false);
    protected _personToUpdate: WritableSignal<Person | undefined> = signal(undefined);

    protected personForm: UntypedFormGroup = new FormGroup({});

    protected fb = inject(FormBuilder);
    protected toastr = inject(ToastrService);

    ngOnInit(): void {
        this.createForm();
    }

    protected createForm(): void {
        this.personForm = this.fb.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            age: [18, Validators.required],
        });
    }

    refresh(): void {
        window.location.reload;
    }

    protected resetForm(): void {
        this.personForm.reset();
        Object.keys(this.personForm.controls).forEach(key => {
            this.personForm.get(key)?.setErrors(null) ;
        });
        this.personForm.controls['age'].setValue(18);
    }
    
    selectItem(person: Person): void {
        this.isUpdateMode.set(true);
        this._personToUpdate.set(person);
        this.personForm.patchValue(person);
    }

    cancel(): void {
        this.isUpdateMode.set(false);
        this._personToUpdate.set(undefined);
        this.resetForm();
    }

}