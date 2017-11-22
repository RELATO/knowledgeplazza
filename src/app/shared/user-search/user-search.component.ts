import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { UserService } from 'app/server/user.service';
import { User } from 'models/user';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
})
export class UserSearchComponent implements OnInit {
  private userQuery = new FormControl();
  private results: Observable<User[]>;
  @Output() private userChosen = new EventEmitter<User>();

  constructor(private userService: UserService) { }

  ngOnInit() {
    let userService = this.userService;

    this.results = this.userQuery.valueChanges
      .distinctUntilChanged()
      // only call the server every 200 milliseconds
      // I know it's not much, but I like the near instant responses
      .debounce(query => {
          // short-circut throttleing of empty query
          // TODO: There has to be a better way to doing this
          if (query.length === 0) { return Observable.interval(0); };

          return Observable.interval(200);
      })
      .switchMap((query: string) => {
        // short-circut evaluation of empty query
        if (query.length === 0) { return Observable.of([]); };

        return userService.searchUser(query).map(batch => batch.data);
      });
  }

  userClick(user: User) {
    this.userChosen.emit(user);
  }
}
