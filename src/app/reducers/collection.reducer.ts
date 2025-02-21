import { createReducer, on } from '@ngrx/store';
import { DataFilesActions } from './data-files.actions';

export const initialState: ReadonlyArray<number> = [];

export const collectionReducer = createReducer(
  initialState,
  on(DataFilesActions.addDataFile, (state, { dataFileId }) => {
    return [...state.filter((item) => item !== dataFileId), dataFileId];
  }),
  on(DataFilesActions.getDataFile, (state, { dataFileId }) => {
    return [dataFileId];
  }),
  on(DataFilesActions.removeDataFile, (state, { dataFileId }) => {
    return state.filter((id) => id !== dataFileId);
  }),
  on(
    DataFilesActions.retrievedSelectedDataFileId,
    (_state, { selectedDataFileId }) => {
      return selectedDataFileId;
    }
  )
);
