//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
//import { map } from 'rxjs/operators';
import { DataFile } from './data-files.model';
import { AppInputData } from './app-input-data.model';

@Injectable({ providedIn: 'root' })
export class DataFilesService {
  //constructor(private http: HttpClient) {}

  getDataFiles(): Observable<Array<AppInputData>> {
    let jsonString = localStorage.getItem('uploadedFile') ?? '';
    let jsonObject = JSON.parse(jsonString) as DataFile;

    return of(jsonObject.content);

  //   let mock: Array<DataFile> = [
  //     { id: '1', category: 'A', value: 30 },
  //     { id: '2', category: 'B', value: 70 },
  //     { id: '3', category: 'C', value: 50 },
  //     { id: '4', category: 'D', value: 90 },
  //     { id: '5', category: 'E', value: 20 },
  //   ];

	return of([]);

    // return this.http
    //   .get<{ items: DataFile[] }>(
    //     'https://www...'
    //   )
    //   .pipe(map((dataFiles) => dataFiles.items || []));
  }

  addDataFile(jsonFile: DataFile) {
    localStorage.setItem('uploadedFile', JSON.stringify(jsonFile));
  }
}
