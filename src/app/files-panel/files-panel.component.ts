import { Component, OnInit } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { DataFilesService } from '../files-table/data-files.service';
import { FilesTableComponent } from '../files-table/files-table.component';
import { FileUploaderComponent } from '../file-uploader/file-uploader.component';

import { Store } from '@ngrx/store';
import {
  selectDataFileCollection,
  selectDataFiles,
} from '../reducers/data-files.selectors';
import {
  DataFilesActions,
  DataFilesApiActions,
} from '../reducers/data-files.actions';
import { DataFile } from '../files-table/data-files.model';

@Component({
  selector: 'app-files-panel',
  imports: [
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

  constructor(
    private dataFilesService: DataFilesService,
    private store: Store
  ) {
    this.dataFiles$ = this.store.select(selectDataFiles);
    this.dataFileCollection$ = this.store.select(selectDataFileCollection);
  }

  onAdd(dataFile: DataFile) {
    let dataFileId = dataFile.dataFileId;
    this.store.dispatch(DataFilesActions.addDataFile({ dataFileId }));
    this.dataFilesService.addDataFile(dataFile);
  }

  onRemove(dataFileId: string) {
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
  }
}
