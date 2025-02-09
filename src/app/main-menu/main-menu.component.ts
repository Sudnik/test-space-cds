import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { FilesPanelComponent } from '../files-panel/files-panel.component';

@Component({
  selector: 'app-main-menu',
  imports: [Menubar, FilesPanelComponent],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.less',
})
export class MainMenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    // this.items = [
    //   {
    //     label: 'Home',
    //     icon: 'pi pi-home',
    //   },
    // ];
  }
}
