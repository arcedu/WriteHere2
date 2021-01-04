import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types';

@Component({
  selector: 'app-memberdashboard-component',
  templateUrl: './memberdashboard.component.html',
 // styleUrls: ['.././site.component.css']
})


export class MemberdashboardComponent {
  public isEditor: boolean;
  public isReader: boolean;
  public isWriter: boolean;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    var user = this.getUser();
    if (user != null) {
      this.isReader = user.isReader;
      this.isEditor = user.isEditor;
      this.isWriter = user.isWriter;
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


