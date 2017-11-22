import { Component, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';

import { LoginService } from 'app/server/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private username: string;
  private password: string;

  constructor(private loginService: LoginService, private router: Router, private snackBar: MdSnackBar) { }

  ngOnInit() {

  }

  login() {
    this.loginService.login(this.username, this.password).then(success => {
      if (success) {
        this.router.navigate(['/plazza']); // navigate to plazza
      } else {
        let config = new MdSnackBarConfig();
        config.duration = 2000;
        this.snackBar.open('Couldn\'t Sign In. Check your username and password', null, config);
      }
    });
  }

}

