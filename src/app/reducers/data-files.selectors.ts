import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AppInputData } from '../files-table/app-input-data.model';

export const selectDataFiles =
  createFeatureSelector<ReadonlyArray<AppInputData>>('dataFiles');

export const selectCollectionState =
  createFeatureSelector<ReadonlyArray<string>>('collection');

export const selectDataFileCollection = createSelector(
  selectDataFiles,
  selectCollectionState,
  (dataFiles, collection) => {
    return collection.map(
      (id) => dataFiles.find((dataFile) => dataFile.id === id)!
    );
  }
);
