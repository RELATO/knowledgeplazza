import { NgModule } from '@angular/core';

import { SharedModule } from 'app/shared/shared.module';

import { BattleComponent } from './battle.component';
// BattlesService Provided in app.module
// import { BattlesService } from './battles.service';

import { routing } from './battles.routing';

@NgModule({
  imports: [routing, SharedModule],
  exports: [],
  declarations: [BattleComponent],
  providers: [],
})
export class BattlesModule { }
