import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';

import { ArchiveItemsComponent } from './archive-items.component';
import { ArchiveComponent } from './archive.component';
import { StatsComponent } from './stats/stats.component';

import { ArchiveService } from './archive.service';
import { StatsService } from './stats/stats.service';

@NgModule({
  imports: [
    SharedModule,
  ],
  exports: [ArchiveComponent],
  declarations: [ArchiveComponent, ArchiveItemsComponent, StatsComponent],
  providers: [ArchiveService, StatsService],
})
export class ArchiveModule { }
