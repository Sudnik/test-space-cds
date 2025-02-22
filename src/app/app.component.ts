import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { D3BarChartComponent } from "./d3-bar-chart/d3-bar-chart.component";
import { D3PieChartComponent } from "./d3-pie-chart/d3-pie-chart.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MainMenuComponent, CardModule, D3BarChartComponent, D3PieChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.less',
})
export class AppComponent {
  title = 'test-space-cds';
}
