import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, DashboardPack, ArticleRow, ArticleQuery } from '../types';

@Component({
  selector: 'app-memberdashboard-component',
  templateUrl: './memberdashboard.component.html',
})


export class MemberdashboardComponent {
  private _baseUrl: string;
  private _http: HttpClient;
  public dashboardPack: DashboardPack;
  public loginUser: User;

  public accordionExpand: boolean[];
  public accordionCount = 10;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    this._http = http;

    this.loginUser = this.getUser();

    this.accordionExpand = new Array(this.accordionCount).fill(false);
    this.accordionExpand[2] = true;

    if (this.loginUser == null) {
      // navigation should not be here, because only loggin user can visit my dashboard.
      // this is for user visit by directly typing url.
      this.loginUser = new User();
      this.loginUser.isAdmin = false;
      this.loginUser.isReader = false;
      this.loginUser.isEditor = false;
      this.loginUser.isWriter = false;
      this.loginUser.isTutor = false;
      this.loginUser.isDrawer = false;
    }
    else {
      this.getDashBoardPackByLoginId();
    }
  }

  public getUser() {
    try { return JSON.parse(localStorage.getItem('user')) as User; }
    catch { return null; }
  }

  public setAccordionSign(index) {
    this.accordionExpand[index] = !this.accordionExpand[index];
  }
  public getAccordionSign(index) {
    if (this.accordionExpand[index]) { return '-'; } else { return '+'; }
  }


  public getDashBoardPackByLoginId() {

    this._http.get<DashboardPack>(this._baseUrl + 'api/Article/GetDashboardPack/?loginId=' + this.loginUser.id)
      .subscribe(result => {
        this.dashboardPack = result;
      }, error => console.error(error));

  }

  public getMyArticleRowsByAuthorId() {
    var user = this.getUser();
    if (user != null) {
      var query = new ArticleQuery();
      query.authorUserId = user.id;
      this.getMyArticleRowsByQuery(query);
    }
  }

  public getMyArticleRowsByEditorId() {
    var user = this.getUser();
    if (user != null) {
      var query = new ArticleQuery();
      query.editorUserId = user.id;
      this.getMyArticleRowsByQuery(query);
    }
  }
  public getMyArticleRowsByVoteupId() {
    var user = this.getUser();
    if (user != null) {
      var query = new ArticleQuery();
      query.votedUpByUserId = user.id;
      this.getMyArticleRowsByQuery(query);
    }
  }

  public getMyArticleRowsByCommentedId() {
    var user = this.getUser();
    if (user != null) {
      var query = new ArticleQuery();
      query.commentedByUserId = user.id;
      this.getMyArticleRowsByQuery(query);
    }
  }
  private getMyArticleRowsByQuery(query) {

    this._http.get<ArticleRow[]>(this._baseUrl + 'api/Article/GetArticleRow/?queryString=' + encodeURIComponent(JSON.stringify(query)))
      .subscribe(result => {
        this.dashboardPack.myArticles = result;
      }, error => console.error(error));
  }


  public composeArticle() {
    location.replace("/articledetails?isEditable=true")

  }

  public redirectToPublished() {
    location.replace("/published")
  }
  public redirectToArticleDetails() {
    location.replace("/articledetails")
  }
  public redirectToMyArticles() {
    location.replace("/myarticles")
  }
  public redirectToMyAssignments() {
    location.replace("/myassignments")
  }

}


