import { Component, Input, OnInit } from '@angular/core';
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
  @Input() files: ReadonlyArray<DataFileHeader> = [];
  tableDataSource!: any;
  selectedFile!: any;

  ngOnInit(): void {
    this.tableDataSource = this.files;
  }

  onRowSelect(event: TableRowSelectEvent) {
    event.data.dataFileId
    console.log(`onRowSelect: event.data.dataFileId=[${event.data.dataFileId}], this.selectedFile.dataFileId=[${this.selectedFile.dataFileId}]`);
  }
}
