import { Injectable } from '@angular/core';

import { FeathersService } from 'app/server/feathers.service';
import { QuestionCategory } from 'models/question-category';

@Injectable()
export class QuestionCategoryService extends FeathersService<QuestionCategory> {
  constructor() {
    super('question-categories');
  }

}
