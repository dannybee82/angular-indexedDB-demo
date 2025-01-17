import { Routes } from '@angular/router';
import { AllPersonsPromisesComponent } from './components/all-persons-promises/all-persons-promises.component';
import { AllPersonsObservablesComponent } from './components/all-persons-observables/all-persons-observables.component';
import { MenuComponent } from './components/menu/menu.component';

export const routes: Routes = [
    {
        path: '',
        component: MenuComponent
    },
    {
        path: 'all-persons-promises-demo',
        component: AllPersonsPromisesComponent
    },
    {
        path: 'all-persons-observables-demo',
        component: AllPersonsObservablesComponent
    }
];