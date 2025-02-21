import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DataFileHeader } from '../files-table/data-file-headers.model';

const maxFilesCount = 5;

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

export const selectNewFileId = createSelector(selectDataFiles, (dataFiles) => {
  let stateCount = dataFiles.length;

  if (stateCount == maxFilesCount) {
    return dataFiles[0].dataFileId;
    //dataFiles.shift();
  } else if (stateCount > 0 && stateCount < maxFilesCount) {
    return stateCount + 1;
  } else {
    return 1;
  }
});
