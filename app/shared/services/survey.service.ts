import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { Survey, Question, UserAnswer } from '../models/survey.model';
import { Global} from '../global';

@Injectable()
export class SurveyService {
  readonly rootUrl = Global.BASE_USER_ENDPOINT + '/api/' +'Surveys';
  
  constructor(private http: HttpClient) { }

  getSurveyByCampaignId(campaignId: number): Observable<Survey> {
    return this.http.get<Survey>(this.rootUrl + '/campaign/' + campaignId);
  }

  createSurvey(survey: Survey): Observable<Survey> {
    let body = JSON.stringify(survey);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Survey>(this.rootUrl + '/insert/', body, httpOptions);
  }

  createQuestion(question: Question): Observable<Question> {
    let body = JSON.stringify(question);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Question>(this.rootUrl + '/question/', body, httpOptions);
  }

  removeQuestion(questionId: number): Observable<Question> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<Question>(this.rootUrl + '/removequestion?id='+ questionId, httpOptions);
  }

  submitSurvey(userAnswers: UserAnswer[]): Observable<boolean>
  {
    let body = JSON.stringify(userAnswers);
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<boolean>(this.rootUrl + '/submitsurvey/', body, httpOptions);
  }
}