import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  TableModule,
  TableRowSelectEvent,
  TableRowUnSelectEvent,
} from 'primeng/table';
import { DataFileHeader } from './data-file-headers.model';

@Component({
  selector: 'app-files-table',
  imports: [TableModule],
  templateUrl: './files-table.component.html',
  styleUrl: './files-table.component.less',
})
export class FilesTableComponent implements OnInit {
  @Input() files!: DataFileHeader[];
  @Input() selectedFile!: DataFileHeader;
  @Output() fileSelected = new EventEmitter<number>();

  ngOnInit(): void {
    console.log(
      `ONINIT: 
      selectedFile=[${this.selectedFile}]
      files=[${this.files}]`
    );
  }

  onRowSelect(event: TableRowSelectEvent) {
    this.fileSelected.emit(event.data.dataFileId);

    console.log(
      `onRowSelect: event.data.dataFileId=[${event.data.dataFileId}], 
      this.selectedFile.dataFileId=[${this.selectedFile.dataFileId}]`
    );
  }
}
