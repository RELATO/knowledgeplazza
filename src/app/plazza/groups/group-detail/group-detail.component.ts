import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Group } from 'models/group';
import { User } from 'models/user';
import { GroupsService } from '../groups.service';

@Component({
  selector: 'app-group-detail',
  templateUrl: './group-detail.component.html',
})
export class GroupDetailComponent implements OnInit, OnDestroy {
  private group: Group;
  private groupName = new FormControl();

  private subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private groupsService: GroupsService,
    private changeDetector: ChangeDetectorRef) {
  }

  ngOnInit() {
    // gets the id the the url/route
    this.subscription = this.route.params.map(params => params['id']).switchMap(id => {
      return this.groupsService.get(id);
    }).takeWhile(group => {
      return group != null; // group will be null when this group is deleted. If it is, just stop updating
    }).subscribe(group => {
      this.group = group;
      this.groupName.setValue(group.name);
      this.changeDetector.detectChanges(); // manually detect changes.. we know something changed
    });
  }

  ngOnDestroy() {
    // clean up subscription
    this.subscription.unsubscribe();
  }

  setGroupName(name: string) {
    if (this.group.name !== name) { // Only update if the name actually changed
      this.groupsService.patch(this.group._id, { name, members: this.group.members });
    }
  }

  removeAt(indexOfPerson: number) {
    this.groupsService.removeAt(this.group, indexOfPerson);
  }

  addPerson(person: User) {
    this.groupsService.addMember(this.group, person);
  }
}
