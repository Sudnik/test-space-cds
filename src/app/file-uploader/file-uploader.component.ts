import { Component, EventEmitter, Output } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  FileSelectEvent,
  FileUpload,
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
  file = new DataFile(0, '', new Date(), []);

  constructor(private messageService: MessageService) {
    this.fileReader.onload = this.OnLoadFile.bind(this);
  }

  onSelect(event: FileSelectEvent) {}

  onStartUpload(event: FileUploadHandlerEvent) {
    this.file = new DataFile(0, event.files[0].name, new Date(), []);
    this.fileReader.readAsText(event.files[0]);
  }

  private OnLoadFile(event: ProgressEvent<FileReader>) {
    try {
      const jsonFileString = event.target?.result as string;
      const jsonObject = JSON.parse(jsonFileString);

      if (this.isValidJson(jsonObject)) {
        this.messageService.add({
          severity: 'info',
          summary: 'Success',
          detail: "File Uploaded to browser's Local Storage",
        });

        this.file.content = jsonObject as AppInputData[];
        this.uploadDone.emit(this.file);
      } else {
        throw new Error();
      }
    } catch (e) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:
          "Invalid data format. File NOT Uploaded to browser's Local Storage!",
      });
    }
  }

  isValidJson(jsonObject: any) {
    try {
      if (
        Array.isArray(jsonObject) &&
        jsonObject.every(
          (item) =>
            item.hasOwnProperty('category') && item.hasOwnProperty('value')
        )
      ) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}
