import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SplashComponent } from './splash.component';
import { QuestionFormComponent } from 'app/question/question-form/question-form.component';

const splashRoutes: Routes = [
  {
    path: '',
    component: SplashComponent,
    pathMatch: 'full'
  },
   {
    path: 'question-form',
    component: QuestionFormComponent
   }
];

export const routing: ModuleWithProviders = RouterModule.forChild(splashRoutes);
