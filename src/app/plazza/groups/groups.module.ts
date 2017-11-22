import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';

import { GroupsService } from './groups.service';

import { GroupDetailComponent } from './group-detail/group-detail.component';
import { GroupsListComponent } from './group-list/group-list.component';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([]),
  ],
  exports: [],
  declarations: [GroupDetailComponent, GroupsListComponent],
  providers: [GroupsService],
})
export class GroupsModule { }
