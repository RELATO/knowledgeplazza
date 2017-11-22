import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeathersService } from './feathers.service';
import { UserService } from './user.service';
import { LoginService } from './login.service';
import { CanActivatePlazza } from './login.guard';
import { RedirectHome } from './login.guard';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    FeathersService,
    UserService,
    LoginService,
    CanActivatePlazza,
    RedirectHome
  ]
})
export class ServerModule { }
