import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import * as d3 from 'd3';

@Directive({
  selector: '[appD3Axis]',
})
export class D3AxisDirective implements OnInit {
  @Input() orient: 'bottom' | 'left' = 'bottom';
  scale = d3.scaleLinear();

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    const axis =
      this.orient === 'bottom'
        ? d3.axisBottom(this.scale)
        : d3.axisLeft(this.scale);

    d3.select(this.elementRef.nativeElement).call(axis);
  }
}
