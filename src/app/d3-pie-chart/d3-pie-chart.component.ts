import { Component, ElementRef, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { AppInputData } from '../files-table/app-input-data.model';
import { Store } from '@ngrx/store';
import { selectDataContent, selectFilteredDataContent } from '../reducers/data-files.selectors';

@Component({
  selector: 'app-d3-pie-chart',
  imports: [],
  templateUrl: './d3-pie-chart.component.html',
  styleUrl: './d3-pie-chart.component.less',
})
export class D3PieChartComponent implements OnInit {
  dataSource!: any;
  width = 928;
  height = Math.min(this.width, 500);
  arc: any;
  arcs: any;
  arcLabel: any;

  constructor(private store: Store, private elementRef: ElementRef) {}

  ngOnInit(): void {
    // this.store.select(selectDataContent).subscribe((dataContent) => {
    //   this.dataSource = dataContent;
    //   this.initChart();
    // });

    this.store.select(selectFilteredDataContent).subscribe((filteredDataContent) => {
      this.dataSource = filteredDataContent;
      this.initChart();
    });
  }

  private initChart() {
    let color: any = d3
      .scaleOrdinal()
      .domain(this.dataSource.map((d: any) => d.category))
      .range(
        d3
          .quantize(
            (t) => d3.interpolateSpectral(t * 0.8 + 0.1),
            this.dataSource.length
          )
          .reverse()
      );

    this.createPieLayoutAndArcs();
    let svg = this.createSvgContainer();
    this.drawPieChart(svg, color);
  }

  private createPieLayoutAndArcs() {
    // Create the pie layout and arc generator.
    let pie = d3
      .pie()
      .sort(null)
      .value((d: any) => d.value);

    this.arc = d3
      .arc()
      .innerRadius(0)
      .outerRadius(Math.min(this.width, this.height) / 2 - 1);

    let labelRadius = this.arc.outerRadius()() * 0.8;

    // A separate arc generator for labels.
    this.arcLabel = d3.arc().innerRadius(labelRadius).outerRadius(labelRadius);

    this.arcs = pie(this.dataSource);
  }

  private createSvgContainer(): d3.Selection<
    d3.BaseType,
    unknown,
    null,
    undefined
  > {
    return d3
      .select(this.elementRef.nativeElement)
      .select('.chart')
      .attr('width', this.width)
      .attr('height', this.height)
      .attr('viewBox', [
        -this.width / 2,
        -this.height / 2,
        this.width,
        this.height,
      ])
      .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;');
  }

  private drawPieChart(svg: any, color: any) {
    // Add a sector path for each value.
    svg
      .append('g')
      .attr('stroke', 'white')
      .selectAll()
      .data(this.arcs)
      .join('path')
      .attr('fill', (d: any) => color(d.data.category))
      .attr('d', this.arc)
      .append('title')
      .text(
        (d: any) =>
          `${d.data.category}: ${d.data.value.toLocaleString('en-US')}`
      );

    // Create a new arc generator to place a label close to the edge.
    // The label shows the value if there is enough room.
    svg
      .append('g')
      .attr('text-anchor', 'middle')
      .selectAll()
      .data(this.arcs)
      .join('text')
      .attr('transform', (d: any) => `translate(${this.arcLabel.centroid(d)})`)
      .call((text: any) =>
        text
          .append('tspan')
          .attr('y', '-0.4em')
          .attr('font-weight', 'bold')
          .text((d: any) => d.data.category)
      )
      .call((text: any) =>
        text
          .filter((d: any) => d.endAngle - d.startAngle > 0.25)
          .append('tspan')
          .attr('x', 0)
          .attr('y', '0.7em')
          .attr('fill-opacity', 0.7)
          .text((d: any) => d.data.value.toLocaleString('en-US'))
      );
  }
}
