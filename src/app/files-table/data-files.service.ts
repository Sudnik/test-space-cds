//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
//import { map } from 'rxjs/operators';
import { DataFile } from './data-files.model';
import { DataFileHeader } from './data-file-headers.model';
import { AppInputData } from './app-input-data.model';

const maxFilesCount = 5;
const localStorageFiles = 'fileTable';

@Injectable({ providedIn: 'root' })
export class DataFilesService {
  //constructor(private http: HttpClient) {}

  getDataFiles(): Observable<Array<DataFileHeader>> {
    let jsonObject = new Array<DataFileHeader>();
    let jsonString = localStorage.getItem(localStorageFiles);

    if (jsonString) {
      jsonObject = JSON.parse(jsonString) as DataFileHeader[];
    }

    return of(jsonObject);

    //   let mock: Array<DataFile> = [
    //     { id: '1', category: 'A', value: 30 },
    //     { id: '2', category: 'B', value: 70 },
    //     { id: '3', category: 'C', value: 50 },
    //     { id: '4', category: 'D', value: 90 },
    //     { id: '5', category: 'E', value: 20 },
    //   ];
    // return this.http
    //   .get<{ items: DataFile[] }>(
    //     'https://www...'
    //   )
    //   .pipe(map((dataFiles) => dataFiles.items || []));
  }

  addDataFile(jsonFile: DataFile) {
    let dataFileHeader: DataFileHeader = {
      dataFileId: jsonFile.dataFileId,
      fileName: jsonFile.fileName,
      uploadDate: jsonFile.uploadDate,
    };
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
