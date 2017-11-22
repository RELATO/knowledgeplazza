import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const loginRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(loginRoutes);
