import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    var username = this.getUsername();
    alert(username);
    http.get<Article[]>(this._baseUrl + 'api/Article/GetArticleList').subscribe(result => {
      this.articles = result;
    }, error => console.error(error));
  }
  public getUsername() { return localStorage.getItem('username'); }
  public getArticleList() {

    this._http.get<Article[]>(this._baseUrl + 'api/Article/GetArticleList').subscribe(result => {
      this.articles = result;
    }, error => console.error(error));
  }

  public composeArticle() {
    location.replace("/articledetails?isEditable=true")

  }
}

interface Article {
  id: string;
  title: string;
  subtitle: string;
  articleStatus: string;
  authorDisplayName: string;
  firstName: string;
  lastName: string;
}

