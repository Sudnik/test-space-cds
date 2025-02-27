import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Nora from '@primeng/themes/nora';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { dataFilesReducer } from './reducers/data-files.reducer';
import { selectedDataFileIdReducer } from './reducers/selected-data-file-id.reducer';
import { dataContentReducer } from './reducers/data-content.reducer';
import { filtersStateReducer } from './reducers/filters-state.reducer';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Nora,
        options: {
          cssLayer: {
              name: 'primeng',
              order: 'app-styles, primeng'
          }
      }
      },
      ripple: false,
    }),
    provideStore({
      dataFiles: dataFilesReducer,
      selectedDataFileId: selectedDataFileIdReducer,
      dataContent: dataContentReducer,
      filtersState: filtersStateReducer,
    }),
  ],
};
