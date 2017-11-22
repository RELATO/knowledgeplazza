import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stat',
  template:
  '<div *ngIf="stat?.answeredCount" [ngClass]="class" style="padding: 5px"> \
  {{ stat?.correct }} / {{ stat?.answeredCount }} \
  </div>',
})
export class StatComponent implements OnInit {
  @Input() stat: any;
  @Input() class = 'body';
  constructor() { }

  ngOnInit() { }
}
