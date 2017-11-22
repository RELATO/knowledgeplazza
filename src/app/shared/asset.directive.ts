import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appAsset]',
})
export class AssetDirective implements OnChanges {
  @Input() appAsset: string;
  @Input() property: string = 'src';

  constructor(private el: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.el.nativeElement[this.property] = '/assets' + this.appAsset;
  }
}
