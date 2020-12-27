import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-publisheddetails-component',
  templateUrl: './publisheddetails.component.html',
  // styleUrls: ['.././site.component.css']
})
export class PublishedDetailsComponent {
  private _baseUrl: string;
  private _http: HttpClient;

  public article: Article;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    //alert('id=' + id);
    //alert('The full URL of this page is:' + window.location.href + " >pathname is "
    //  + window.location.pathname + "search is :" + window.location.search);
    var id = window.location.search.substr(4);
    alert(window.location.search.substr(4))
  
    this._baseUrl = baseUrl;
    this._http = http;
    this.getArticle(id);
  }

  public getArticle(id) {

    this._http.get<Article>(this._baseUrl + 'api/Article/GetArticle?id=' + id).subscribe(result => {
      this.article = result;
    }, error => console.error(error));
  }

}
interface Article {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  authorDisplayName: string;
  firstName: string;
  lastName: string;
}
