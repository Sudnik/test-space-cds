import { createActionGroup, props } from '@ngrx/store';
import { DataFileHeader } from '../files-table/data-file-headers.model';
import { AppInputData } from '../files-table/app-input-data.model';
import { FiltersState } from '../data-filters/filters-state.model';

export const DataFilesActions = createActionGroup({
  source: 'DataFiles',
  events: {
    'Set Filters State': props<{ filtersState: FiltersState }>(),
    'Set Selected DataFile Id': props<{ selectedDataFileId: number }>(),
    'Add DataFile': props<{ dataFile: DataFileHeader }>(),
    'Get DataContent': props<{ dataContent: DataFileHeader }>(),
    //'Get NoneMin DataContent': props<{ dataContent: DataFileHeader }>(),
  },
});

export const DataFilesApiActions = createActionGroup({
  source: 'DataFiles API',
  events: {
    'Retrieved Filters State': props<{ filtersState: FiltersState }>(),
    'Retrieved Selected DataFile Id': props<{ selectedDataFileId: number }>(),
    'Retrieved DataFile List': props<{ dataFiles: Array<DataFileHeader> }>(),
    'Retrieved DataFile Content': props<{ dataContent: Array<AppInputData> }>(),
  },
});
