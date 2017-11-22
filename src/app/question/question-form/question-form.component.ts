import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';

@Component({
  selector: 'question-form',
  templateUrl: './question-form.component.html',
})
export class QuestionFormComponent implements OnInit {
  private questionData = {
    category: '',
    answers: [],
    questionText: '',
    correctAnswer: 0
  };

  constructor(private questionService: QuestionService ) { }

  ngOnInit() {
  }

  submitQuestion() {
    this.questionService.create(this.questionData).subscribe(value => {
      console.log(value);
    });
 }
}
