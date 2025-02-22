import { Component, EventEmitter, Output } from '@angular/core';
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
import { AppInputData } from '../files-table/app-input-data.model';

@Component({
  selector: 'app-file-uploader',
  imports: [FileUpload, HttpClientModule, ToastModule],
  templateUrl: './file-uploader.component.html',
  styleUrl: './file-uploader.component.less',
  providers: [MessageService],
})
export class FileUploaderComponent {
  @Output() uploadDone = new EventEmitter<DataFile>();
  fileReader = new FileReader();
  file: DataFile = {
    dataFileId: 0,
    fileName: '',
    uploadDate: new Date(),
    content: [],
  };

  constructor(private messageService: MessageService) {
    this.fileReader.onload = this.OnLoadFile.bind(this);
  }

  onSelect(event: FileSelectEvent) {
  }

  onStartUpload(event: FileUploadHandlerEvent) {
    this.file = {
      dataFileId: 0,
      fileName: event.files[0].name,
      uploadDate: new Date(),
      content: [],
    };

    this.fileReader.readAsText(event.files[0]);

    this.messageService.add({
      severity: 'info',
      summary: 'Success',
      detail: 'File Uploaded with Auto Mode',
    });
  }

  private OnLoadFile(event: ProgressEvent<FileReader>) {
    const jsonFileString = event.target?.result as string;
    const jsonObject = JSON.parse(jsonFileString);
    this.file.content = jsonObject as AppInputData[];

    this.uploadDone.emit(this.file);
  }

  onError(event: FileUploadErrorEvent) {
    console.log('onError event!');
  }
}
