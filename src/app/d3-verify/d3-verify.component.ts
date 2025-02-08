import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import * as d3 from 'd3';
import { ButtonModule } from 'primeng/button';
import { D3AxisDirective } from '../d3-axis.directive';

@Component({
  selector: 'app-d3-verify',
  imports: [ButtonModule, D3AxisDirective],
  templateUrl: './d3-verify.component.html',
  styleUrl: './d3-verify.component.less',
})
export class D3VerifyComponent implements OnInit, OnDestroy {
  data = [10, 20, 30, 40, 50];

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    // Initialize D3.js chart within the component's native element
    const svg = d3
      .select(this.elementRef.nativeElement)
      .select('.chart')
      // .append('svg')
      .attr('width', 400)
      .attr('height', 200);
    // .append('circle')
    // .attr('cx', 200)
    // .attr('cy', 100)
    // .attr('r', 50)
    // .style('fill', 'red');

    svg
      .selectAll('rect')
      .data(this.data)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i * 40)
      .attr('y', (d) => 200 - d)
      .attr('width', 30)
      .attr('height', (d) => d)
      .style('fill', 'blue');
  }

  ngOnDestroy(): void {
    // Clean up D3.js chart when component is destroyed
    d3.select(this.elementRef.nativeElement)
      .select('.chart')
      .selectAll('*')
      .remove();
  }

  onClick(): void {
    // Update data and redraw chart on button click
    this.data = this.data.map((d) => d + Math.random() * 10);

    const svg = d3.select('.chart');

    svg
      .selectAll('rect')
      .data(this.data)
      .attr('height', (d) => d);
  }
}
