import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FeathersBatch } from 'models/batch';
import { User } from 'models/user';

import { FeathersService } from './feathers.service';

@Injectable()
export class UserService extends FeathersService<User> {

  constructor() {
    super('users');
  }

  get currentUserName(): string {
    let user = this.user;
    if (user === undefined) {
      console.error('Not logged in before accessing currentUserName');
      return '';
    } else {
      return user.username;
    }
  }

  searchUser($search: string) {
    return this.find({
      username: { $search },
    });
  }
}
