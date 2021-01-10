import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types';

@Component({
  selector: 'app-memberdashboard-component',
  templateUrl: './memberdashboard.component.html',
 // styleUrls: ['.././site.component.css']
})


export class MemberdashboardComponent {
  public loginUser: User;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.loginUser = this.getUser();
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
  }

  public getUser() {
    try { return JSON.parse(localStorage.getItem('user')) as User; }
    catch { return null; }
  }

  public redirectToMyAccount() {
    location.replace("/myaccount")
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


