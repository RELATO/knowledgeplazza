import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BattlesService } from 'app/battles/battles.service';

import { Battle } from 'models/battle';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
})
export class BattleComponent implements OnInit {
  public battle: Battle;
  public url: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private battlesService: BattlesService,
  ) { }

  ngOnInit() {
    this.activatedRoute.params.switchMap(params => {

      return this.battlesService.get(params['id']);
    }).subscribe(battle => {
      this.battle = battle;
    });

    this.url = this.router.url;
  }
}
