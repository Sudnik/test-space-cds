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
  books$;
  bookCollection$;

  constructor(
    private dataFilesService: DataFilesService,
    private store: Store
  ) {
    this.books$ = this.store.select(selectDataFiles);
    this.bookCollection$ = this.store.select(selectDataFileCollection);
  }

  onAdd(dataFileId: string) {
    this.store.dispatch(DataFilesActions.addDataFile({ dataFileId }));
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
