import { createReducer, on } from '@ngrx/store';
import { DataFilesApiActions } from './data-files.actions';
import { DataFileHeader } from '../files-table/data-file-headers.model';

export const initialState: ReadonlyArray<DataFileHeader> = [];

export const dataFilesReducer = createReducer(
  initialState,
  on(
    DataFilesApiActions.retrievedDataFileList,
    (_state, { dataFiles }) => dataFiles
  )
);
