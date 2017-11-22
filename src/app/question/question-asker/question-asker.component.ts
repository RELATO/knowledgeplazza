import { Component, OnDestroy, OnInit } from '@angular/core';
import { MdSnackBar, MdSnackBarRef } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { Question } from 'models/question';
import { QuestionCheckService } from '../question-check.service';
import { QuestionService } from '../question.service';

@Component({
  selector: 'app-question-asker',
  templateUrl: './question-asker.component.html',
})
export class QuestionAskerComponent implements OnInit, OnDestroy {
  private question: Question;
  private snackBarRef?: MdSnackBarRef<any>;
  private correctAnswer: number = undefined;

  /// the value here is the current question id
  private questionAdvance = new BehaviorSubject<string>(undefined);

  /// helper method to create a 5 second timer Observable
  private get timer(): Observable<number> {
    return Observable.interval(2000).first();
  }

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MdSnackBar,
    private questionService: QuestionService,
    private questionChecker: QuestionCheckService) {
  }

  ngOnInit() {
    Observable.combineLatest(
      this.questionAdvance,
      this.route.params.map(params => params['id']),
      this.route.queryParams.map(queryParams => queryParams['category']),
    ).switchMap(values => {
      let currentId = values[0];
      let routeId = values[1];
      let routeCategory = values[2];

      // tslint:disable-next-line:triple-equals
      if (routeId != '') {
        // id in params: use the id
        return this.questionService.get(routeId);
      } else {
        // no id in params: use category
        return this.questionService.nextQuestion(routeCategory, currentId);
      }
    }).subscribe(question => {
      this.question = question;
      this.correctAnswer = undefined;
    });
  }

  ngOnDestroy() {
    if (this.snackBarRef) {
      this.snackBarRef.dismiss();
    }
  }

  answerChosen(chosenAnswer: number) {

    this.questionChecker.checkQuestion(this.question, chosenAnswer).subscribe(data => {
      this.correctAnswer = data.correctAnswer;

      if (this.correctAnswer === chosenAnswer) {
        this.snackBarRef = this.snackBar.open('You chose the correct answer!');
      } else {
        this.snackBarRef = this.snackBar.open('You chose the wrong answer...');
      }

      this.timer.subscribe(() => {
        if (this.snackBarRef) { this.snackBarRef.dismiss(); }
        this.questionAdvance.next(this.question._id);
      });
    });

  }
}

