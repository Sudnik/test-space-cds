import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { DataFilesService } from '../files-table/data-files.service';
import { FilesTableComponent } from '../files-table/files-table.component';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';

import { Store } from '@ngrx/store';
import {
  selectSelectedDataFile,
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
  selectedDataFile$;
  newFileId!: number;

  constructor(
    private dataFilesService: DataFilesService,
    private store: Store
  ) {
    this.dataFiles$ = this.store.select(selectDataFiles);
    this.selectedDataFile$ = this.store.select(selectSelectedDataFile);

    this.store.select(selectNewFileId).subscribe((dataFileId) => {
      this.newFileId = dataFileId;
    });
  }

  onAdd(dataFile: DataFile) {
    let selectedDataFileId = this.newFileId;
    dataFile.dataFileId = selectedDataFileId;

    this.store.dispatch(DataFilesActions.addDataFile({ dataFile }));
    this.dataFilesService.addDataFile(dataFile);

    this.onSelect(selectedDataFileId);
  }

  onSelect(selectedDataFileId: number) {
    this.store.dispatch(
      DataFilesActions.setSelectedDataFileId({ selectedDataFileId })
    );
    this.dataFilesService.setSelectedDataFileId(selectedDataFileId);
    this.getFileContext(selectedDataFileId);
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
      .subscribe((selectedDataFileId) => {
        this.store.dispatch(
          DataFilesApiActions.retrievedSelectedDataFileId({
            selectedDataFileId,
          })
        );

        this.getFileContext(selectedDataFileId);
      });
  }

  getFileContext(selectedDataFileId: number) {
    this.dataFilesService
      .getDataContent(selectedDataFileId)
      .subscribe((dataContent) =>
        this.store.dispatch(
          DataFilesApiActions.retrievedDataFileContent({ dataContent })
        )
      );
  }
}
