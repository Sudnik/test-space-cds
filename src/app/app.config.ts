import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
//import { reducers, metaReducers } from './reducers';
import { dataFilesReducer } from './reducers/data-files.reducer';
import { collectionReducer } from './reducers/collection.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
      ripple: false,
    }),
    //provideStore(reducers, { metaReducers }),
    provideStore({ dataFiles: dataFilesReducer, collection: collectionReducer }),
  ],
};
