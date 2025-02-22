import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { D3BarChartComponent } from "./d3-bar-chart/d3-bar-chart.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainMenuComponent, CardModule, D3BarChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'test-space-cds';
}
