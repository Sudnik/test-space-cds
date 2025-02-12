import { createReducer, on } from '@ngrx/store';
import { DataFilesApiActions } from './data-files.actions';
import { DataFile } from '../files-table/data-files.model';

export const initialState: ReadonlyArray<DataFile> = [];

export const dataFilesReducer = createReducer(
  initialState,
  on(
    DataFilesApiActions.retrievedDataFileList,
    (_state, { dataFiles }) => dataFiles
  )
);
