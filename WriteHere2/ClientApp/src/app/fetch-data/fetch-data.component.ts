import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Article, ArticleRow, ArticleQuery } from '../types';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  private _baseUrl: string;
  private _http: HttpClient;

  public forecasts: WeatherForecast[];
  public articles: ArticleRow[];
  public article: Article;
  public users: User[];


  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    this._http = http;

    http.get<WeatherForecast[]>(baseUrl + 'api/SampleData/WeatherForecasts').subscribe(result => {
      this.forecasts = result;
    }, error => console.error(error));

  }

  public getArticle() {

    this._http.get<Article>(this._baseUrl + 'api/Article/GetArticle?id=4CA6E115-BD4C-4D9B-AEB8-A590E80719EA').subscribe(result => {
      this.article = result;
    }, error => console.error(error));
  }

  public getPublishedArticleRowsByQuery() {
    var query = new ArticleQuery();
    query.statusName = 'published';
    query.genre = 'fantasy';
  
    this._http.get<ArticleRow[]>(this._baseUrl + 'api/Article/GetArticleRows/?queryString=' + encodeURIComponent(JSON.stringify(query)))
      .subscribe(result => {
      this.articles = result;
    }, error => console.error(error));
  }

  public getUserList() {
    alert('a');
    this._http.get<User[]>(this._baseUrl + 'api/User/GetUserList').subscribe(result => {
     this.users = result;
  }, error => console.error(error));
}

}
interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}


