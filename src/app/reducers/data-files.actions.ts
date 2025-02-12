import { createActionGroup, props } from '@ngrx/store';
import { DataFile } from '../files-table/data-files.model';

export const DataFilesActions = createActionGroup({
  source: 'DataFiles',
  events: {
    'Add DataFile': props<{ dataFileId: string }>(),
    'Remove DataFile': props<{ dataFileId: string }>(),
  },
});

export const DataFilesApiActions = createActionGroup({
  source: 'DataFiles API',
  events: {
    'Retrieved DataFile List': props<{ dataFiles: ReadonlyArray<DataFile> }>(),
  },
});
