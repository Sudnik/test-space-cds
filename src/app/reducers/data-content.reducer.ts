import { createReducer, on } from '@ngrx/store';
import { DataFilesApiActions } from './data-files.actions';
import { AppInputData } from '../files-table/app-input-data.model';

export const initialState: Array<AppInputData> = [];

export const dataContentReducer = createReducer(
  initialState,
  on(
    DataFilesApiActions.retrievedDataFileContent,
    (_state, { dataContent }) => dataContent
  )
);
