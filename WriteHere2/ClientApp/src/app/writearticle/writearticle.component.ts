
import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../types';


@Component({
  selector: 'app-writearticle-component',
  templateUrl: './writearticle.component.html',
 // styleUrls: ['.././site.component.css']
})
export class writearticleComponent {
  private _baseUrl: string;
  private _http: HttpClient;
  private article: Article;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    this._http = http;
  }

  public addArticle(a: Article){
    return this._http.post<Article>(this._baseUrl + 'api/Article/AddArticle', a)
    ;
  }
  public redirectTo() {
 
    location.replace("/memberdashboard")

  }
  public redirectToFiles() {
    location.replace("/filewritearticle")
  }
}
