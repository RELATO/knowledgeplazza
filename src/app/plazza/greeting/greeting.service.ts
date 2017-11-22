import { Injectable } from '@angular/core';
import { sample } from 'lodash';

@Injectable()
export class GreetingService {

  constructor() { }

  public generateGreeting(date: Date, name: string): string {
    let potentialGreetings = [
      'Welcome ',
      'Hello ',
      'Hi '
    ];

    if (date.getHours() < 12) {
      potentialGreetings.push('Good Morning ');
    }

    if (date.getHours() > 12) {
      potentialGreetings.push('Good Afternoon ');
    }

    return sample(potentialGreetings) + name;
  }

}
