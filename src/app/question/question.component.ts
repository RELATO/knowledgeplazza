import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { Question } from 'models/question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  private _question = {
      questionText: 'How did Alexandar Hamilton die?',
      answers: [
        'He was poisoned',
        'He drowned in a river',
        'Burr shot him',
      ],
  };

  get question() {
    return this._question;
  }

  @Input() set question(newQuestion: Question) {
    this._question = newQuestion;

    // new question.. Allow chosing answers again
    this.allowChosingAnswers = true;
  }

  /// set to disable everything but the correctAnswer
  @Input() correctAnswer;

  @Output() answerChosen = new EventEmitter<number>();

  private allowChosingAnswers = true;

  constructor() { }

  ngOnInit() {
  }

  submit(answerIndex: number) {
    if (this.allowChosingAnswers) {
      this.answerChosen.emit(answerIndex);
      this.allowChosingAnswers = false;
    }
  }

  letter(index): string {
    let Aord = 'A'.charCodeAt(0);

    return String.fromCharCode(Aord + index) + '. ';
  }
}
