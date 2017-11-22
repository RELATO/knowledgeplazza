export class Question {
  public _id?: any;

  public questionText: string;
  public answers: string[];
  public correctAnswer?: number;

  public category?: string;
}
