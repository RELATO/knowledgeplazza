import { ModuleWithProviders } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { RedirectHome } from 'app/server/login.guard';
import { AppComponent } from './app.component';

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    canActivate: [RedirectHome],
    component: AppComponent,
  },
  {
    path: 'splash',
    loadChildren: 'app/splash/splash.module#SplashModule',
  },
  {
    path: 'plazza',
    loadChildren: 'app/plazza/plazza.module#PlazzaModule',
  },
  {
    path: 'login',
    loadChildren: 'app/login/login.module#LoginModule',
  },
  {
    path: 'b',
    loadChildren: 'app/battles/battles.module#BattlesModule',
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, {
  preloadingStrategy: PreloadAllModules,
});
