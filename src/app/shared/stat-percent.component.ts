import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-percent',
  template:
  '<div *ngIf="stat?.answeredCount" [ngClass]="class" style="padding: 5px"> \
  {{ stat?.correct / stat?.answeredCount | percent }} \
  </div>',
})
export class StatPercentComponent implements OnInit {
  @Input() stat: any;
  @Input() class: string;

  constructor() { }

  ngOnInit() { }
}
