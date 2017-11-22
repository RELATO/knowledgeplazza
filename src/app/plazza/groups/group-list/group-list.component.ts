import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Group } from 'models/group';
import { User } from 'models/user';
import { GroupsService } from '../groups.service';

import { BattlesService } from 'app/battles/battles.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
})
export class GroupsListComponent implements OnInit {

  constructor(
    private groupsService: GroupsService,
    private battlesService: BattlesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

  get groups() {
    return this.groupsService.items;
  }

  addGroup(member: User) {
    this.groupsService
      .create('UnnamedGroup', [member])
      .take(1)
      .subscribe((newGroup: Group) => {
        this.openGroup(newGroup._id);
      });
  }

  openGroup(id: string) {
    this.router.navigate(['../group', id], {relativeTo: this.route});
  }

  openRecentBattle(recentBattle) {
    this.router.navigate(['/b', recentBattle._id]);
  }

  battle() {
    this.battlesService.battleNow();
  }
}
