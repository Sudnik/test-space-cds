import { createReducer, on } from '@ngrx/store';
import { DataFilesApiActions } from './data-files.actions';
import { AppInputData } from '../files-table/app-input-data.model';

export const initialState: ReadonlyArray<AppInputData> = [];

export const dataFilesReducer = createReducer(
  initialState,
  on(
    DataFilesApiActions.retrievedDataFileList,
    (_state, { dataFiles }) => dataFiles
  )
);
