import { Component, Inject} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User,Article } from '../types';

@Component({
  selector: 'app-articledetails-component',
  templateUrl: './articledetails.component.html',
})

export class ArticleDetailsComponent{
  private _baseUrl: string;
  private _http: HttpClient;
  public isEditable: boolean;
  public article: Article;
  public msg: string;
  public userId: string;
  public isEditor: boolean;
  public isWriter: boolean;

  public getUser() {
    try { return JSON.parse(localStorage.getItem('user')) as User; }
    catch { return null; }
  }

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {

    const urlParams = new URLSearchParams(window.location.search);
    var articleid = urlParams.get('id');
    var user = this.getUser();
    if (user != null) {
      this.userId = user.id;
      this.isEditor = user.isEditor;
      this.isWriter = user.isWriter;

      if (articleid == null && this.isWriter) {
        this.article = new Article();
        this.article.title = 'NEW ARTICLE';
        this.isEditable = true;
      }
      else {
        this._baseUrl = baseUrl;
        this._http = http;
        this.getArticle(articleid);
        if ((this.isWriter && this.article.ownerUserId == this.userId )
          || this.isEditor && this.article.editorUserId == this.userId ) {
          this.isEditable = true;
        }
      }
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

    this.article.ownerUserId = this.userId;
      this._http.post(this._baseUrl + 'api/Article/', this.article)
        .subscribe((res: Article) => {
          this.article = res;
          this.msg = 'Saved at ' + new Date();
        })
  };

  // still debug. not working
  public submitArticle() {
    if (confirm("Once submitted, you cannot edit the article. \nAre you sure to submit the article?")) {

      this.article.ownerUserId = this.getUser().id;
      this._http.get(this._baseUrl + 'api/Article/sumbitArticle')
        .subscribe((res: Article) => {
          this.article = res;
          this.msg = 'Submitted at ' + new Date();
        })
    }
  }

  public deleteArticle() {
    if (confirm("Once delete, you cannot undo the deletion. \nAre you sure to delete the article?")) {

      this.article.ownerUserId = this.getUser().id;
      this._http.delete(this._baseUrl + 'api/Article/' + this.article.id )
        .subscribe((res: Article) => {
          this.article = res;
          this.msg = 'Deleted at ' + new Date();
        })
    }
  }
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
 

}
