import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-published-component',
  templateUrl: './published.component.html',
 // styleUrls: ['.././site.component.css']
})
export class PublishedComponent {
  private _baseUrl: string;
  private _http: HttpClient;
  public isLiked: boolean;
  public articles: Article[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    this._http = http;
    this.isLiked = true;


    http.get<Article[]>(this._baseUrl + 'api/Article/GetArticleList').subscribe(result => {
      this.articles = result;
    }, error => console.error(error));
  }

}
interface Article {
  id: string;
  title: string;
  subtitle: string;

  authorDisplayName: string;
  firstName: string;
  lastName: string;
}
