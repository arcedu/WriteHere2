import { Component, Inject} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User, Article } from '../types';

@Component({
  selector: 'app-articledetails-component',
  templateUrl: './articledetails.component.html',
})


export class ArticleDetailsComponent{
  private _baseUrl: string;
  private _http: HttpClient;
  
  public article: Article;
  public msg: string;
  public user: User;
  public isEditor: boolean;
  public isWriter: boolean;
  public isNewArticle: boolean;

  public getUser() {
    try { return JSON.parse(localStorage.getItem('user')) as User; }
    catch { return null; }
  }

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {

    const urlParams = new URLSearchParams(window.location.search);
    var articleid = urlParams.get('id');
    this.user = this.getUser();
    if (this.user != null) {
      if (articleid == null && this.isWriter) {
        this.article = new Article();
        this.article.title = 'NEW ARTICLE';
        this.isNewArticle = true;
        this.isEditor = false;
        this.isWriter = this.user.isWriter;

      }
      else {
        this.article = new Article();
        this.article.title = 'loading ... ';

        this.isNewArticle = false;
        this._baseUrl = baseUrl;
        this._http = http;
        this.getArticle(articleid);
      }
    }
  }
  
  public getArticle(id) {
    this._http.get<Article>(this._baseUrl + 'api/Article/GetArticle?id=' + id)
      .subscribe(result => {
        this.article = result;
        this.isEditor = this.user.isEditor
          && this.article.editorUserId == this.user.id
          && this.article.ownerUserId != this.user.id;
        this.isWriter = this.user.isWriter
          && this.article.ownerUserId == this.user.id;

      }, error => console.error(error));
  }

  public saveArticle() {

    this.article.ownerUserId = this.user.id;
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


}
export interface  Article2 {
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  content: string;
  editorReviewNote: string;
  genre: string;
}
