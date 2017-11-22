import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Battle } from 'models/battle';

import { FeathersService } from 'app/server/feathers.service';

@Injectable()
export class BattlesService extends FeathersService<Battle> {

  constructor(private router: Router) {
    super('battles');
  }

  public battleNow() {
    this.create({}).subscribe(battle => {
      this.router.navigate(['/b', battle._id]);
    });
  }

}
