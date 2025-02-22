import { createActionGroup, props } from '@ngrx/store';
import { DataFileHeader } from '../files-table/data-file-headers.model';
import { AppInputData } from '../files-table/app-input-data.model';

export const DataFilesActions = createActionGroup({
  source: 'DataFiles',
  events: {
    'Set Selected DataFile Id': props<{ selectedDataFileId: number }>(),
    'Add DataFile': props<{ dataFile: DataFileHeader }>(),
    'Get DataContent': props<{ dataContent: DataFileHeader }>(),
  },
});

export const DataFilesApiActions = createActionGroup({
  source: 'DataFiles API',
  events: {
    'Retrieved Selected DataFile Id': props<{ selectedDataFileId: number }>(),
    'Retrieved DataFile List': props<{ dataFiles: Array<DataFileHeader> }>(),
    'Retrieved DataFile Content': props<{ dataContent: Array<AppInputData> }>(),
  },
});
