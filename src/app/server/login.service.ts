import { Injectable } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { feathersCore } from './feathers.core';
import { FeathersService } from './feathers.service';

@Injectable()
export class LoginService extends FeathersService<any> {
  // Create a ReplaySubject with a buffer size of 1
  // This subject will pass any 'onNext' call on to subscribers,
  // and will replay the most recent value to new subscribers
  public authStatus = new ReplaySubject<boolean>(1);

  constructor(private router: Router, private snackBar: MdSnackBar) {
    super('users');

    // authenticate immediately using stored token
    this.authenticate();

    // If socketio's transport changes, you have to call authenticate() again.
    feathersCore.socket.io.engine.on('upgrade', transport => {
      this.authenticate();
    });

    // TODO: debugging info
    this.authStatus.subscribe(status => {
      console.log('Auth: ', status);
    });
  }

  public login(username: string, password: string): Promise<boolean> {
    return this.authenticate({
      type: 'local',
      username,
      password,
    });
  }

  public createUser(username: string, password: string) {
    return this.create({
      username,
      password,
    }).first()
    .switchMap(() => {
      return this.login(username, password);
    });
  }

  public logout() {
    this.app.logout(); // tell feathers to delete auth token
    this.authStatus.next(false);
  }

  /// Returns an observable that resolves to true or false
  public isLoggedIn(): Observable<boolean> {
    // returns authStatus.first(), so it completes immediately with the most recent value
    return this.authStatus.first();
  }

    /// helper method to call feathers 'authenticate' method, convert the result to a boolean, and update authStatus
  private authenticate(params?: any): Promise<boolean> {
    let authStatus = this.authStatus; // allows authStatus to be captured by arrow function

    return this.app.authenticate(params).then(result => {
      return true;
    }).catch(error => {
      return false;
    }).then(resultAsBool => {
      authStatus.next(resultAsBool);
      return resultAsBool; // return result to caller in a promise
    });
  }

}
