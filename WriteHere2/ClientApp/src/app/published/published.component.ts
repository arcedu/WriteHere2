import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article, ArticleQuery } from '../types';

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

    this.getArticleListByQuery();
  }

  public getArticleListByQuery() {
    var query = new ArticleQuery();
    query.statusName = 'Published';

    this._http.get<Article[]>(this._baseUrl + 'api/Article/GetArticleList/?queryString=' + encodeURIComponent(JSON.stringify(query)))
      .subscribe(result => {
        this.articles = result;
      }, error => console.error(error));

  }
}
