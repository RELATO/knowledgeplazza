import { Component, OnInit } from '@angular/core';

import { UserService } from 'app/server/user.service';
import { GreetingService } from './greeting.service';

@Component({
  selector: 'app-greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss']
})
export class GreetingComponent implements OnInit {
  private greeting: string;

  constructor(private userService: UserService, private greetingService: GreetingService) { }

  ngOnInit() {
    this.greeting = this.greetingService.generateGreeting(new Date(), this.userService.currentUserName);
  }
}
