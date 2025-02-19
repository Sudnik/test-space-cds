import { createActionGroup, props } from '@ngrx/store';
import { DataFileHeader } from '../files-table/data-file-headers.model';

export const DataFilesActions = createActionGroup({
  source: 'DataFiles',
  events: {
    'Add DataFile': props<{ dataFileId: number }>(),
    'Remove DataFile': props<{ dataFileId: number }>(),
  },
});

export const DataFilesApiActions = createActionGroup({
  source: 'DataFiles API',
  events: {
    'Retrieved DataFile List': props<{ dataFiles: ReadonlyArray<DataFileHeader> }>(),
  },
});
