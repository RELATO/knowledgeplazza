import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from 'app/server/login.service';

@Component({
  selector: 'app-plazza-header',
  templateUrl: './plazza-header.component.html',
  styleUrls: ['./plazza-header.component.scss']
})
export class PlazzaHeaderComponent implements OnInit {

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit() {
  }

  logout() {
    this.loginService.logout();
    this.router.navigate(['/']);
  }

}
