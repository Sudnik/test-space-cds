import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainMenuComponent } from './main-menu/main-menu.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'test-space-cds';
}
