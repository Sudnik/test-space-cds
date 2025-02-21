import { createReducer, on } from '@ngrx/store';
import { DataFilesApiActions } from './data-files.actions';
import { DataFileHeader } from '../files-table/data-file-headers.model';

export const initialState: Array<DataFileHeader> = [];

export const dataFilesReducer = createReducer(
  initialState,
  on(DataFilesApiActions.addDataFile, (state, { dataFile }) => {
    return [
      ...state.filter(
        (fileHeader) => fileHeader.dataFileId !== dataFile.dataFileId
      ),
      dataFile,
    ];
  }),
  on(
    DataFilesApiActions.retrievedDataFileList,
    (_state, { dataFiles }) => dataFiles
  )
);
