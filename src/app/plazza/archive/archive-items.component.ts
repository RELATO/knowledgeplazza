import { Component, OnInit } from '@angular/core';

import { ArchiveService } from './archive.service';

@Component({
  selector: 'app-archive-items',
  templateUrl: './archive-items.component.html',
  styleUrls: ['./archive-items.component.scss']
})
export class ArchiveItemsComponent implements OnInit {
  error = false;

  constructor(private archiveService: ArchiveService) { }

  ngOnInit() {
  }

  // private get items() {
  //   return this.archiveService.items.do(() => {
  //     this.error = false;
  //   }).catch(error => {
  //     this.error = true;
  //     return [];
  //   });
  // }

  img(item): any {
    return { 'background-image': 'url( /assets/archive/' + item.img + ')', 'background-size': 'cover' };
  }

  unlock(): void {
    this.archiveService.unlockNextItem();
  }
}
