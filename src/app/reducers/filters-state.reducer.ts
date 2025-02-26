import { createReducer, on } from '@ngrx/store';
import { DataFilesActions, DataFilesApiActions } from './data-files.actions';
import { FiltersState } from '../data-filters/filters-state.model';

export const initialState: FiltersState = {
  isAlphabeticalSorting: false,
  isMinValueHide: false,
};

export const filtersStateReducer = createReducer(
  initialState,
  on(
    DataFilesActions.setFiltersState,
    (state, { filtersState }) => {
      return filtersState;
    }
  ),
  on(
    DataFilesApiActions.retrievedFiltersState,
    (_state, { filtersState }) => {
      return filtersState;
    }
  )
);
