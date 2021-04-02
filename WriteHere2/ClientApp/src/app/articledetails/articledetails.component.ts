import { Component, Inject} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User, Article, Lookup, ArticleCommentQuery, ArticleStatusHistory, StandardResponse, ArticleComment} from '../types';


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
  public genres: Lookup[];
 
  public isReader: boolean;
  public isEditor: boolean;
  public isWriter: boolean;
  public isNewArticle: boolean;

  public accordionExpand: boolean[];
  public accordionCount = 10;
  public newComment: string;
  public editingComment: boolean = false;

  public getUser() {
    try { return JSON.parse(localStorage.getItem('user')) as User; }
    catch { return null; }
  }

  public getGenres() {
    try {
      return JSON.parse(localStorage.getItem('genres')) as Lookup[];
    }
    catch { return null; }
  }

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    this._http = http;
    this.accordionExpand = new Array(this.accordionCount).fill(false);
    this.accordionExpand[2] = true;

    const urlParams = new URLSearchParams(window.location.search);
    var articleid = urlParams.get('id');
    this.user = this.getUser();
    this.genres = this.getGenres();
   
    if (this.user != null) {
      if (articleid == null) {
        //this.accordionExpand[1] = true;
        this.article = new Article();
        this.article.title = 'NEW ARTICLE';
        this.isNewArticle = true;
        this.isEditor = false;
        this.isReader = false;
        this.isWriter = this.user.isWriter;

      }
      else {
        this.article = new Article();
        this.article.title = 'loading ... ';
        this.isNewArticle = false;
        this.getArticle(articleid);
      }
    }
  }

  public setAccordionSign(index) {
    this.accordionExpand[index] = !this.accordionExpand[index];
  }

  public getAccordionSign(index) {
    if (this.accordionExpand[index]) { return '-'; } else { return '+'; }
  }

  public getArticle(id) {
    
    this._http.get<Article>(this._baseUrl + 'api/Article/GetArticle?id=' + id
      + '&byId=' + this.user.id)
      .subscribe(result => {
        this.article = result;
        this.isEditor = this.user.isEditor
          && this.article.editorUserId == this.user.id
          && this.article.authorUserId != this.user.id;
        this.isWriter = this.user.isWriter
          && this.article.authorUserId == this.user.id;
        this.isReader = this.user.isReader
          && this.article.authorUserId != this.user.id;

      }, error => console.error(error));
  }
  
  public saveArticle() {

    this.article.authorUserId = this.user.id;
      this._http.post(this._baseUrl + 'api/Article/', this.article)
        .subscribe((res: Article) => {
    
          this.article.id = res.id;
          this.msg = 'Saved at ' + new Date();
        })
  };

  // still debug. not working
  public submitArticle() {
   
    if (confirm("Once submitted, you cannot edit the article. \nAre you sure to submit the article?")) {
      alert('Submnit  ' + this.article.id);
      this._http.get(this._baseUrl + 'api/ArticleStatusHistory/Submit?articleId=' + this.article.id)
        .subscribe((res:StandardResponse) => {
          if (res.success ) {
            this.article.articleStatus = 'Submitted';
            this.msg = 'Submitted at ' + new Date();
          }
        })
    }
  }

  public deleteArticle() {

    if (confirm("Once delete, you cannot undo the deletion. \nAre you sure to delete the article?")) {

      this.article.authorUserId = this.getUser().id;
      this._http.delete(this._baseUrl + 'api/Article/' + this.article.id )
        .subscribe((res: StandardResponse) => {
         
          this.msg = 'Deleted at ' + new Date();
        })
    }
  }
  
  public saveComment() {
    var comment = new ArticleComment();
    comment.commentOwnerId = this.user.id;
    comment.comment = this.newComment;
    comment.articleId = this.article.id;
    
    this.article.authorUserId = this.user.id;
    this._http.post(this._baseUrl + 'api/ArticleComment/', comment)
      .subscribe((res: ArticleComment) => {
        this.article.comments.unshift(res);
      })
  };

  public vote(vote) {

  }


  public getComments() {
    var query = new ArticleCommentQuery();
    query.articleId = this.article.id;
    this._http.get<ArticleComment>(this._baseUrl + 'api/ArticleComment/GetCommentList?query='
      + encodeURIComponent(JSON.stringify(query)))
      .subscribe(result => {
        this.article.comments=[];
        this.article.comments.fill( result);
       
      }, error => console.error(error));
  };
}
