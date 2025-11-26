import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { importProvidersFrom } from '@angular/core';

export const appConfig: ApplicationConfig = {
  providers: [ 
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideAnimations(), 
    importProvidersFrom(ToastrModule.forRoot({ positionClass: 'toast-bottom-center' })),
  ]
};