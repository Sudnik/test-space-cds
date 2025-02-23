import { createSelector, createFeatureSelector } from '@ngrx/store';
import { DataFileHeader } from '../files-table/data-file-headers.model';
import { AppInputData } from '../files-table/app-input-data.model';
import { FiltersState } from '../data-filters/filters-state.model';

const maxFilesCount = 5;

export const selectDataFiles =
  createFeatureSelector<Array<DataFileHeader>>('dataFiles');

export const selectSelectedDataFileId =
  createFeatureSelector<number>('selectedDataFileId');

export const selectDataContent =
  createFeatureSelector<Array<AppInputData>>('dataContent');

export const selectFiltersState =
  createFeatureSelector<FiltersState>('filtersState');

export const selectSelectedDataFile = createSelector(
  selectDataFiles,
  selectSelectedDataFileId,
  (dataFiles, selectedDataFileId) => {
    return dataFiles.find(
      (dataFile) => dataFile.dataFileId === selectedDataFileId
    )!;
  }
);

export const selectNewFileId = createSelector(selectDataFiles, (dataFiles) => {
  let stateCount = dataFiles.length;

  if (stateCount == maxFilesCount) {
    return dataFiles[0].dataFileId;
  } else if (stateCount >= 0 && stateCount < maxFilesCount) {
    return stateCount + 1;
  }

  throw new Error('Incorrect NewFileId!');
});

export const selectFilteredDataContent = createSelector(
  selectFiltersState,
  selectDataContent,
  (filtersState, dataContent) => {
    if (filtersState.isCategoriesGrouping) {
    }

    if (filtersState.isAlphabeticalSorting) {
      let buffer: any = dataContent.slice(0);

      return buffer.sort((a: any, b: any) =>
        a.category.localeCompare(b.category)
      );
    }
    else {
      return dataContent;
    }

    if (filtersState.isMinValueHide) {
    }
  }
);
