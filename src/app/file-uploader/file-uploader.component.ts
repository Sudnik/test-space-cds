import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  FileSelectEvent,
  FileUpload,
  FileUploadErrorEvent,
  FileUploadEvent,
  FileUploadHandlerEvent,
} from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';
import { DataFile } from '../files-table/data-files.model';

@Component({
  selector: 'app-file-uploader',
  imports: [FileUpload, HttpClientModule, ToastModule],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.less',
  providers: [MessageService],
})
export class FileUploaderComponent {
  constructor(private messageService: MessageService) {}

  uploadHandler(event: FileUploadHandlerEvent) {
    console.log('uploadHandler event!');
  }

  onSelect(event: FileSelectEvent) {
    let file: DataFile = {
      id: '0',
      category: event.files[0].name,
      value: 0
    };

    console.log(`onSelect event! ${file.category}`);
  }

  onUpload(event: FileUploadEvent) {
    console.log('onUpload event!');

    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Auto Mode',
    });
  }

  onError(event: FileUploadErrorEvent) {
    console.log('onError event!');
  }
}
