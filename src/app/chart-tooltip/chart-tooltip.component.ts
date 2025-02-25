import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-chart-tooltip',
  imports: [],
  templateUrl: './chart-tooltip.component.html',
  styleUrl: './chart-tooltip.component.less'
})
export class ChartTooltipComponent {
  @Input() categoryValue!: number;
}
