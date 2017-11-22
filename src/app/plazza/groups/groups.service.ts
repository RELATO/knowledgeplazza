import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Group } from 'models/group';
import { User } from 'models/user';

import { FeathersService } from 'app/server/feathers.service';

@Injectable()
export class GroupsService extends FeathersService<Group> {

  constructor() {
    super('groups');
  }

  create(name: string, members: User[]) {
    let memberIds = members.map(member => member._id);
    return super.create({ name, memberIds });
  }

  addMember(group: Group, person: User) {
    let memberIds = group.memberIds;
    memberIds.push(person._id);
    return super.patch(group._id, { memberIds });
  }

  removeAt(group: Group, index: number) {
    let memberIds = group.memberIds;
    memberIds.splice(index, 1);
    return super.patch(group._id, { memberIds });
  }

}
