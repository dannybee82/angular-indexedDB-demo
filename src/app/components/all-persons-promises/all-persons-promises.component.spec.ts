import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPersonsPromisesComponent } from './all-persons-promises.component';

describe('AllPersonsPromisesComponent', () => {
  let component: AllPersonsPromisesComponent;
  let fixture: ComponentFixture<AllPersonsPromisesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllPersonsPromisesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllPersonsPromisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
