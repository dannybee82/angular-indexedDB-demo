import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPersonsObservablesComponent } from './all-persons-observables.component';

describe('AllPersonsObservablesComponent', () => {
  let component: AllPersonsObservablesComponent;
  let fixture: ComponentFixture<AllPersonsObservablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPersonsObservablesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPersonsObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
