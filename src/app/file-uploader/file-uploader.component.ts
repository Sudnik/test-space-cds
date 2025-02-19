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
  @Output() add = new EventEmitter<DataFile>();
  fileReader = new FileReader();
  file: DataFile;

  constructor(private messageService: MessageService) {
    this.fileReader.onload = this.OnLoadFile.bind(this);
    this.file = {
      dataFileId: 0,
      fileName: '',
      uploadDate: new Date(),
      content: [],
    };
  }

  onSelect(event: FileSelectEvent) {
    console.log('onSelect event!');
  }

  uploadHandler(event: FileUploadHandlerEvent) {
    console.log('uploadHandler event!');
    console.log(event);

    // this.file.dataFileId = '1';
    this.file.fileName = event.files[0].name;

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
    
    this.file.uploadDate = new Date();
    this.file.content = jsonObject as AppInputData[];

    this.add.emit(this.file);
  }

  onError(event: FileUploadErrorEvent) {
    console.log('onError event!');
  }
}
