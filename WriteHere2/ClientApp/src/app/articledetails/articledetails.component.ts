import { Component, Inject} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';


@Component({
  selector: 'app-articledetails-component',
  templateUrl: './articledetails.component.html',
  // styleUrls: ['.././site.component.css']
})
export class ArticleDetailsComponent{
  private _baseUrl: string;
  private _http: HttpClient;
  public isEditable: boolean;
  public article: Article;
   
  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {

    const urlParams = new URLSearchParams(window.location.search);
    var id = urlParams.get('id');
    this.isEditable = (urlParams.get('isEditable') === 'true');
    if (id == null) {
        this.article = new Article();
        this.article.title = 'NEW ARTICLE';
      }
      else {
        this._baseUrl = baseUrl;
        this._http = http;
        this.getArticle(id);

      }
    }
  
  public getArticle(id) {
    this._http.get<Article>(this._baseUrl + 'api/Article/GetArticle?id=' + id)
      .subscribe(result => {
        this.article = result;
      }, error => console.error(error));
  }

  public testOther() {
    alert('testOther : ' + this.article.id);
    this._http.get<Article>(this._baseUrl + 'api/Article/AnyFuncName?id=' + this.article.id)  // +'&aaa=123b')
      .subscribe(result => {
        var a = result;
        a.title = 'test';
      }, error => console.error(error));
  }

  public saveArticle() {
    alert('saveArticle : ' + this.article.title);

    if (this.article.id == null) {
      alert('this.article.id == null');
      this._http.post(this._baseUrl + 'api/Article/' , this.article)
        .subscribe((res: Article) => this.article = res)
    } else {
      alert('NOT null');
      this._http.post(this._baseUrl + 'api/Article/', this.article)
      .subscribe((res: Article) => this.article = res)
    }
  };


  //public get() {
  //  alert('get ' + this._baseUrl +this.url);
  //  return this._http.get(this._baseUrl +this.url, { headers: this.headers });
  //}
  //public add() {
  //  return this._http.post(this._baseUrl +this.url, this.payload, { headers: this.headers });
  //}
  //public remove() {
  //  return this._http.delete(this._baseUrl +this.url + '/' + this.payload.id, { headers: this.headers });
  //}
  //public update() {
  //  alert('update ' + this._baseUrl +this.url);
  //  return this._http.put(this._baseUrl +this.url + '/' + this.payload.id, this.payload, { headers: this.headers });
  //}

}

export class Article {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  content: string;
  authorDisplayName: string;
  firstName: string;
  lastName: string;
}
