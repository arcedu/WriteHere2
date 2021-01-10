import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Article, ArticleQuery } from '../types';

@Component({
  selector: 'app-userlist-component',
  templateUrl: './userlist.component.html',
  //styleUrls: ['.././site.component.css']
})
export class UserListComponent {
  private _baseUrl: string;
  private _http: HttpClient;
  public userlist: User[];




  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    this._http = http;

    this.getUserInfo();
  }
  public getUserInfo() {
  //var query = new ArticleQuery();
  //query.statusName = 'Published';

  this._http.get<User[]>(this._baseUrl + 'api/User/GetUserList/')
    .subscribe(result => {
      this.userlist = result;
    }, error => console.error(error));
}
  //public getUser() {
  //  try { return JSON.parse(localStorage.getItem('user')) as User; }
  //  catch { return null; }
  //}

  //public getUserInfo() {
  //  var user = this.getUserInfo();
  //  if (user != null) {
  //    var query = new ArticleQuery();

      //    this._http.get<Article[]>(this._baseUrl + 'api/Article/GetArticleList/?queryString=' + encodeURIComponent(JSON.stringify(query)))
      //      .subscribe(result => {
      //        this.articles = result;
      //      }, error => console.error(error));
      //  }
      //}

      //public composeArticle() {
      //  location.replace("/articledetails?isEditable=true")

    }

  
