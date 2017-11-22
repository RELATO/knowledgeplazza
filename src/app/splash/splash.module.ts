import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from 'app/shared/shared.module';
import { QuestionModule } from 'app/question/question.module';

import { AboutUsComponent } from './about-us/about-us.component';
import { SplashComponent } from './splash.component';

import { routing } from './splash.routing';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    QuestionModule,

    routing
  ],
  exports: [],
  declarations: [AboutUsComponent, SplashComponent],
  providers: [],
})
export class SplashModule { }
