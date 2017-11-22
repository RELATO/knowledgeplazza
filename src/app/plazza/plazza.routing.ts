import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivatePlazza } from 'app/server/login.guard';

import { PlazzaComponent } from './plazza.component';
import { ArchiveComponent } from './archive/archive.component';
import { QuestionBrowserComponent } from 'app/question/question-browser/question-browser.component';
import { QuestionAskerComponent } from 'app/question/question-asker/question-asker.component';

import { GroupDetailComponent } from './groups/group-detail/group-detail.component';
import { GroupsListComponent } from './groups/group-list/group-list.component';


const plazzaRoutes: Routes = [
  {
    path: '',
    component: PlazzaComponent,
    canActivate: [CanActivatePlazza],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'questions'
      },
      {
        path: 'questions',
        component: QuestionBrowserComponent
      },
      {
        path: 'question/:id',
        component: QuestionAskerComponent
      },
      {
        path: 'archive',
        component: ArchiveComponent
      },
      {
        path: 'groups',
        component: GroupsListComponent
      },
      {
        path: 'group/:id',
        component: GroupDetailComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(plazzaRoutes);
