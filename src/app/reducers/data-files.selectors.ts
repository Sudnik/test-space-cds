import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DataFileHeader } from '../files-table/data-file-headers.model';

export const selectDataFiles =
  createFeatureSelector<ReadonlyArray<DataFileHeader>>('dataFiles');

export const selectCollectionState =
  createFeatureSelector<ReadonlyArray<number>>('collection');

export const selectDataFileCollection = createSelector(
  selectDataFiles,
  selectCollectionState,
  (dataFiles, collection) => {
    return collection.map(
      (id) => dataFiles.find((dataFile) => dataFile.dataFileId === id)!
    );
  }
);
