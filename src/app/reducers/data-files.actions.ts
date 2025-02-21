import { createActionGroup, props } from '@ngrx/store';
import { DataFileHeader } from '../files-table/data-file-headers.model';

export const DataFilesActions = createActionGroup({
  source: 'DataFiles',
  events: {
    'Add DataFile': props<{ dataFileId: number }>(),
    'Get DataFile': props<{ dataFileId: number }>(),
    'Remove DataFile': props<{ dataFileId: number }>(),
    'Retrieved Selected DataFile Id': props<{ selectedDataFileId: ReadonlyArray<number> }>(),
  },
});

export const DataFilesApiActions = createActionGroup({
  source: 'DataFiles API',
  events: {
    'Add DataFile': props<{ dataFile: DataFileHeader }>(),
    'Retrieved DataFile List': props<{ dataFiles: Array<DataFileHeader> }>(),
  },
});
