import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DataFile } from '../files-table/data-files.model';

export const selectDataFiles =
  createFeatureSelector<ReadonlyArray<DataFile>>('dataFiles');

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
