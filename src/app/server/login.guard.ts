import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { LoginService } from './login.service';

@Injectable()
export class CanActivatePlazza implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.loginService.isLoggedIn().do((isLoggedIn) => {
      //TODO: Log
      console.log("CanActivatePlazza: isLoggedIn = ", isLoggedIn);
      
      if (!isLoggedIn) { this.router.navigate(['login']); }
    });
  }
}

/// This class redirects a route to 'plazza' if the user is logged in, or to 'splash' if the user is not
@Injectable()
export class RedirectHome implements CanActivate {
  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let loginStatus = this.loginService.isLoggedIn();

    return loginStatus.map(isLoggedIn => {
      return isLoggedIn ? 'plazza' : 'splash';
    }).map(path => {
      this.router.navigate([path]);
    }, this).mapTo(true); // we are just using CanActivate for side effects, return true to always allow activation of this route
  }
}
