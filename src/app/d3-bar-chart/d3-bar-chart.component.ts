import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ChartTooltipComponent } from '../chart-tooltip/chart-tooltip.component';
import { Store } from '@ngrx/store';
import {
  selectDataContent,
  selectFilteredDataContent,
} from '../reducers/data-files.selectors';
import { AppInputData } from '../files-table/app-input-data.model';

@Component({
  selector: 'app-d3-bar-chart',
  providers: [DialogService],
  templateUrl: './d3-bar-chart.component.html',
  styleUrl: './d3-bar-chart.component.less',
})
export class D3BarChartComponent implements OnInit, OnDestroy {
  dataSource!: AppInputData[];
  barHeight = 25;
  marginTop = 30;
  marginRight = 0;
  marginBottom = 10;
  marginLeft = 30;
  width = 928;
  height!: number;
  x!: d3.ScaleLinear<number, number, never>;
  y!: d3.ScaleBand<string>;
  format!: (d: d3.NumberValue) => string;
  ref: DynamicDialogRef | undefined;

  constructor(
    private store: Store,
    private elementRef: ElementRef,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    (window as any)['showTooltip'] = this.showTooltip.bind(this);
    (window as any)['hideTooltip'] = this.hideTooltip.bind(this);

    this.store
      .select(selectFilteredDataContent)
      .subscribe((filteredDataContent) => {
        this.dataSource = filteredDataContent;
        this.initChart();
      });
  }

  ngOnDestroy(): void {
    this.clearSvgContainer();
  }

  private initChart() {
    this.height =
      Math.ceil((this.dataSource.length + 0.1) * this.barHeight) +
      this.marginTop +
      this.marginBottom;

    this.x = d3
      .scaleLinear()
      .domain([0, d3.max(this.dataSource, (d) => d.value)!])
      .range([this.marginLeft, this.width - this.marginRight]);

    //.domain(d3.sort(this.dataSource, (d) => -d.value).map((d) => d.category))
    this.y = d3
      .scaleBand()
      .domain(this.dataSource.map((d) => d.category))
      .rangeRound([this.marginTop, this.height - this.marginBottom])
      .padding(0.1);

    // this.format = this.x.tickFormat(20, '%');
    this.format = this.x.tickFormat(20, '');

    let svg = this.setupSvgContainer();
    this.addBars(svg);
    this.addBarsValues(svg);
    this.addAxes(svg);
  }

  private setupSvgContainer(): d3.Selection<
    d3.BaseType,
    unknown,
    null,
    undefined
  > {
    this.clearSvgContainer();

    return d3
      .select(this.elementRef.nativeElement)
      .select('.chart')
      .attr('width', this.width) //300
      .attr('height', this.height) //150
      .attr('viewBox', [0, 0, this.width, this.height])
      .attr('style', 'max-width: 100%; height: auto; font: 10px sans-serif;');
  }

  private clearSvgContainer() {
    d3.select(this.elementRef.nativeElement)
      .select('.chart')
      .selectAll('*')
      .remove();
  }

  private addBars(svg: d3.Selection<d3.BaseType, unknown, null, undefined>) {
    svg
      .append('g')
      .attr('fill', 'steelblue')
      .selectAll()
      .data(this.dataSource)
      .join('rect')
      .attr('x', this.x(0))
      .attr('y', (d) => this.y(d.category)!)
      .attr('width', (d) => this.x(d.value) - this.x(0))
      .attr('height', this.y.bandwidth())
      .attr(
        'onmouseover',
        (d: any) =>
          `window["showTooltip"]('${d.category}:${d.value}')`
      )
      .attr('onmouseout', 'window["hideTooltip"]()');
  }

  private addBarsValues(
    svg: d3.Selection<d3.BaseType, unknown, null, undefined>
  ) {
    svg
      .append('g')
      .attr('fill', 'white')
      .attr('text-anchor', 'end')
      .selectAll()
      .data(this.dataSource)
      .join('text')
      .attr('x', (d) => this.x(d.value))
      .attr('y', (d) => this.y(d.category)! + this.y.bandwidth() / 2)
      .attr('dy', '0.35em')
      .attr('dx', -4)
      .text((d) => this.format(d.value))
      .call((text) =>
        text
          .filter((d) => this.x(d.value) - this.x(0) < 20) // short bars
          .attr('dx', +4)
          .attr('fill', 'black')
          .attr('text-anchor', 'start')
      );
  }

  private addAxes(svg: d3.Selection<d3.BaseType, unknown, null, undefined>) {
    svg
      .append('g')
      .attr('transform', `translate(0,${this.marginTop})`)
      //.call(d3.axisTop(this.x).ticks(this.width / 80, '%'))
      .call(d3.axisTop(this.x).ticks(20, ''))
      .call((g) => g.select('.domain').remove());

    svg
      .append('g')
      .attr('transform', `translate(${this.marginLeft},0)`)
      .call(d3.axisLeft(this.y).tickSizeOuter(0));
  }

  showTooltip(catData: any) {
    let data = catData.split(':');

    this.ref = this.dialogService.open(ChartTooltipComponent, {
      inputValues: {
        categoryValue: data[1],
      },
      focusOnShow: false,
      modal: false,
      header: `Category ${data[0]}`,
    });
  }

  hideTooltip() {
    this.ref?.close();
  }
}
