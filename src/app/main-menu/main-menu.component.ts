import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { FilesPanelComponent } from '../files-panel/files-panel.component';
import { DataFiltersComponent } from "../data-filters/data-filters.component";
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-main-menu',
  imports: [Menubar, AvatarModule, FilesPanelComponent, DataFiltersComponent],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.less',
})
export class MainMenuComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Filters',
      },
    ];
  }
}
