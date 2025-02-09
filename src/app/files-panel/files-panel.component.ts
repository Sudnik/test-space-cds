import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { FilesTableComponent } from "../files-table/files-table.component";
import { FileUploaderComponent } from "../file-uploader/file-uploader.component";

@Component({
  selector: 'app-files-panel',
  imports: [DrawerModule, ButtonModule, FilesTableComponent, FileUploaderComponent],
  templateUrl: './files-panel.component.html',
  styleUrl: './files-panel.component.less',
})
export class FilesPanelComponent {
  visible: boolean = false;
}
