import { Component } from '@angular/core';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-root',
  template: `
  <div *ngIf="sizeHelp">
    <span fxShow="false" fxShow.xs> XS </span>
    <span fxShow="false" fxShow.sm> SM </span>
    <span fxShow="false" fxShow.md> MD </span>
    <span fxShow="false" fxShow.lg> LG </span>
    <span fxShow="false" fxShow.xl> XL </span>
  </div>
  <router-outlet></router-outlet>`,
})
export class AppComponent {
  constructor() { }

  get sizeHelp(): boolean {
    return environment.production === false;
  }
}
