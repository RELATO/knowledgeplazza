import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { FeathersService } from 'app/server/feathers.service';
import { Question } from 'models/question';
import { QuestionCheckData } from 'models/question-check';

@Injectable()
export class QuestionCheckService extends FeathersService<QuestionCheckData> {

  constructor() {
    super('check-questions');
  }

  checkQuestion(question: Question, chosenAnswer: number) {
    return this.create({
      questionId: question._id,
      chosenAnswer,
    }).first();
  }
}
