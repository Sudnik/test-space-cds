import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { DataFilesService } from '../files-table/data-files.service';
import { FilesTableComponent } from '../files-table/files-table.component';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';

import { Store } from '@ngrx/store';
import {
  selectDataFileCollection,
  selectDataFiles,
  selectNewFileId,
} from '../reducers/data-files.selectors';
import {
  DataFilesActions,
  DataFilesApiActions,
} from '../reducers/data-files.actions';
import { DataFile } from '../files-table/data-files.model';

@Component({
  selector: 'app-files-panel',
  imports: [
    CommonModule,
    DrawerModule,
    ButtonModule,
    FilesTableComponent,
    FileUploaderComponent,
  ],
  templateUrl: './files-panel.component.html',
  styleUrl: './files-panel.component.less',
})
export class FilesPanelComponent implements OnInit {
  visible: boolean = false;
  dataFiles$;
  dataFileCollection$;
  newFileId!: number;

  constructor(
    private dataFilesService: DataFilesService,
    private store: Store
  ) {
    this.dataFiles$ = this.store.select(selectDataFiles);
    this.dataFileCollection$ = this.store.select(selectDataFileCollection);
    this.store.select(selectNewFileId).subscribe((dataFileId) => {
      this.newFileId = dataFileId;
    });
  }

  onAdd(dataFile: DataFile) {
    let dataFileId = this.newFileId;
    dataFile.dataFileId = dataFileId;
    this.store.dispatch(DataFilesApiActions.addDataFile({ dataFile }));
    this.store.dispatch(DataFilesActions.addDataFile({ dataFileId }));
    this.dataFilesService.addDataFile(dataFile);
  }

  onGet(dataFileId: number) {
    this.store.dispatch(DataFilesActions.getDataFile({ dataFileId }));
  }

  onRemove(dataFileId: number) {
    this.store.dispatch(DataFilesActions.removeDataFile({ dataFileId }));
  }

  ngOnInit() {
    this.dataFilesService
      .getDataFiles()
      .subscribe((dataFiles) =>
        this.store.dispatch(
          DataFilesApiActions.retrievedDataFileList({ dataFiles })
        )
      );

    this.dataFilesService
      .getSelectedDataFileId()
      .subscribe((selectedDataFileId) =>
        this.store.dispatch(
          DataFilesActions.retrievedSelectedDataFileId({ selectedDataFileId })
        )
      );
  }
}
