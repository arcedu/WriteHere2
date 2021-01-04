import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Article } from '../types';

@Component({
  selector: 'app-myarticles-component',
  templateUrl: './myarticles.component.html',
  //styleUrls: ['.././site.component.css']
})
export class MyArticlesComponent {
  private _baseUrl: string;
  private _http: HttpClient;


  public articles: Article[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    this._http = http;

    this.getArticleList();
  }

  public getUser() {
    try { return JSON.parse(localStorage.getItem('user')) as User; }
    finally { return null; }
  }

  public getArticleList() {
    var user = this.getUser();
    if (user != null) {
       this._http.get<Article[]>(this._baseUrl + 'api/Article/GetArticleList?authorUserid=' + user.id)
        .subscribe(result => {
          this.articles = result;
        }, error => console.error(error));
    }
  }

  public composeArticle() {
    location.replace("/articledetails?isEditable=true")

  }
}
