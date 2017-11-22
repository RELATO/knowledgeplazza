import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'app/server/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  private username: string;
  private password: string;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {

  }

  signUp() {
    this.loginService.createUser(this.username, this.password).subscribe((value) => {
      this.router.navigate(['plazza']); // navigate to plazza
    });
  }
}
