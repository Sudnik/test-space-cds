import { createReducer, on } from '@ngrx/store';
import { DataFilesActions, DataFilesApiActions } from './data-files.actions';

export const initialState: number = 0;

export const selectedDataFileIdReducer = createReducer(
  initialState,
  on(DataFilesActions.setSelectedDataFileId, (state, { selectedDataFileId }) => {
    return selectedDataFileId;
  }),
  on(
    DataFilesApiActions.retrievedSelectedDataFileId,
    (_state, { selectedDataFileId }) => {
      return selectedDataFileId;
    }
  )
);
