import { createReducer, on } from '@ngrx/store';
import { DataFilesActions } from './data-files.actions';

export const initialState: ReadonlyArray<number> = [];

export const collectionReducer = createReducer(
  initialState,
  on(DataFilesActions.removeDataFile, (state, { dataFileId }) =>
    state.filter((id) => id !== dataFileId)
  ),
  on(DataFilesActions.addDataFile, (state, { dataFileId }) => {
    if (state.indexOf(dataFileId) > -1) return state;

    return [...state, dataFileId];
  })
);
