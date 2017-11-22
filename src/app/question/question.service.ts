import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FeathersService } from 'app/server/feathers.service';
import { Question } from 'models/question';

@Injectable()
export class QuestionService extends FeathersService<Question> {
  constructor() {
    super('questions');
  }

  /// helper method to get the next question
  nextQuestion(category?: string, currentId?: string) {
    let query: any = {};

    if (category) {
      query.category = category;
    }

    // if there is a current question, make sure the next one is different
    if (currentId) {
      query._id = { $ne: currentId };
    }

    return this.random(query).first();
  }

}
