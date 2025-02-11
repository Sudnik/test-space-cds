import { Component, OnInit } from '@angular/core';
import {
  TableModule,
  TableRowSelectEvent,
  TableRowUnSelectEvent,
} from 'primeng/table';

@Component({
  selector: 'app-files-table',
  imports: [TableModule],
  templateUrl: './files-table.component.html',
  styleUrl: './files-table.component.less',
})
export class FilesTableComponent implements OnInit {
  files!: any[];
  selectedFile!: any;

  ngOnInit(): void {
    this.files = [
      {
        id: 1,
        name: 'TestFile1.json',
        date: new Date().toLocaleString(),
      },
      {
        id: 2,
        name: 'TestFile2.json',
        date: new Date().toLocaleString(),
      },
      {
        id: 3,
        name: 'TestFile3.json',
        date: new Date().toLocaleString(),
      },
      {
        id: 4,
        name: 'TestFile4.json',
        date: new Date().toLocaleString(),
      },
      {
        id: 5,
        name: 'TestFile5.json',
        date: new Date().toLocaleString(),
      },
    ];
  }

  onRowSelect(event: TableRowSelectEvent) {
    console.log('onRowSelect');
  }
}
