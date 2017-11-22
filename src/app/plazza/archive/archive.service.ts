import { Injectable } from '@angular/core';

import { FeathersService } from 'app/server/feathers.service';

export class ArchiveItem {
  name: string;
  img: string;
  createdAt: Date;

  get src() {
    return '/assets/archive/' + this.img;
  }
}

@Injectable()
export class ArchiveService extends FeathersService<ArchiveItem> {

  constructor() {
    super('archive-items');
  }

  unlockNextItem() {
    this.create({});
  }

}
