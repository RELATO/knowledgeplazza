import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'app/shared/shared.module';

import { QuestionAskerComponent } from './question-asker/question-asker.component';
import { QuestionBrowserComponent } from './question-browser/question-browser.component';
import { QuestionFormComponent } from './question-form/question-form.component';
import { QuestionComponent } from './question.component';

import { QuestionCategoryService } from './question-category.service';
import { QuestionCheckService } from './question-check.service';
import { QuestionService } from './question.service';

@NgModule({
  imports: [SharedModule, FormsModule],
  exports: [QuestionComponent, QuestionBrowserComponent],
  declarations: [
    QuestionComponent,
    QuestionBrowserComponent,
    QuestionAskerComponent,
    QuestionFormComponent,
  ],
  providers: [QuestionService, QuestionCategoryService, QuestionCheckService],
})
export class QuestionModule { }
