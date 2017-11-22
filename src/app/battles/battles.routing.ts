import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BattleComponent } from './battle.component';

const battlesRoutes: Routes = [
  {
    path: ':id',
    component: BattleComponent,
  },
  {
    path: '',
    component: BattleComponent,
  },
];

export const routing: ModuleWithProviders = RouterModule.forChild(battlesRoutes);
