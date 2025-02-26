import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataFile } from './data-files.model';
import { DataFileHeader } from './data-file-headers.model';
import { AppInputData } from './app-input-data.model';
import { FiltersState } from '../data-filters/filters-state.model';

const maxFilesCount = 5;
const localStorageFiles = 'fileTable';
const localStorageSelectedId = 'selectedDataFileId';
const localStorageFiltersState = 'filtersState';

@Injectable({ providedIn: 'root' })
export class DataFilesService {
  setFiltersState(filtersState: FiltersState) {
    let json = JSON.stringify(filtersState);
    localStorage.setItem(localStorageFiltersState, json);
  }

  getFiltersState(): Observable<FiltersState> {
    let json = localStorage.getItem(localStorageFiltersState);
    return of(JSON.parse(json!));
  }

  getSelectedDataFileId(): Observable<number> {
    let item = localStorage.getItem(localStorageSelectedId);

    return item ? of(parseInt(item)) : of(1);
  }

  setSelectedDataFileId(selectedDataFileId: number) {
    localStorage.setItem(localStorageSelectedId, selectedDataFileId.toString());
  }

  getDataContent(selectedDataFileId: number): Observable<Array<AppInputData>> {
    let jsonString = localStorage.getItem(selectedDataFileId.toString());

    if (jsonString) {
      let jsonObject = JSON.parse(jsonString) as AppInputData[];
      jsonObject.map((item, i) => {
        item.index = i;
        return item;
      });
      return of(jsonObject);
    }

    return of([]);
  }

  getDataFiles(): Observable<Array<DataFileHeader>> {
    let jsonString = localStorage.getItem(localStorageFiles);

    if (jsonString) {
      let jsonObject = JSON.parse(jsonString) as DataFileHeader[];
      return of(jsonObject);
    }

    return of([]);
  }

  addDataFile(jsonFile: DataFile) {
    let dataFileHeader = new DataFileHeader(
      jsonFile.dataFileId,
      jsonFile.fileName,
      jsonFile.uploadDate
    );
    let fileContent = jsonFile.content;

    let newFileId = this.addDataFileHeader(dataFileHeader);
    this.addAppInputData(newFileId, fileContent);
  }

  private addDataFileHeader(dataFileHeader: DataFileHeader): number {
    let dataFileHeaders = new Array<DataFileHeader>();
    dataFileHeader.dataFileId = 1;

    let jsonDataFileHeaders = localStorage.getItem(localStorageFiles);

    if (jsonDataFileHeaders) {
      dataFileHeaders = JSON.parse(jsonDataFileHeaders);
      let headersLength = dataFileHeaders.length;
      let fileId = dataFileHeaders[headersLength - 1].dataFileId;

      if (headersLength == maxFilesCount) {
        let fileToRemove = dataFileHeaders.shift();

        if (fileToRemove) {
          this.removeAppInputData(fileToRemove.dataFileId);
          dataFileHeader.dataFileId = fileToRemove.dataFileId;
        }
      } else {
        dataFileHeader.dataFileId = ++fileId;
      }
    }

    dataFileHeaders.push(dataFileHeader);
    localStorage.setItem(localStorageFiles, JSON.stringify(dataFileHeaders));

    return dataFileHeader.dataFileId;
  }

  private addAppInputData(fileId: number, fileData: AppInputData[]) {
    localStorage.setItem(fileId.toString(), JSON.stringify(fileData));
  }

  private removeAppInputData(fileId: number) {
    localStorage.removeItem(fileId.toString());
  }
}
