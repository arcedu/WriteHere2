import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html'
})
export class FetchDataComponent {
  private _baseUrl: string;
  private _http: HttpClient;

  public forecasts: WeatherForecast[];
  public articles: Article[];
  public article: Article;


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

  public getArticleList() {

    this._http.get<Article[]>(this._baseUrl + 'api/Article/GetArticleList').subscribe(result => {
      this.articles = result;
    }, error => console.error(error));
  }

}

interface WeatherForecast {
  dateFormatted: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
interface Article {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  articleStatus: string;
  authorDisplayName: string;
  firstName: string;
  lastName: string;
}
