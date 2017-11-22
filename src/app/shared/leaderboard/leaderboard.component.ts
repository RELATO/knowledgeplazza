import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Group } from 'models/group';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
})
export class LeaderboardComponent implements OnInit {
  @Input() group: Group;

  @Output() removeAt = new EventEmitter<number>();

  constructor() { }

  remove(indexOfPerson: number) {
    this.removeAt.emit(indexOfPerson);
  }

  ngOnInit() { }
}
