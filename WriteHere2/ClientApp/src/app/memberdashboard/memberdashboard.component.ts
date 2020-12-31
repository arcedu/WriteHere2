import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-memberdashboard-component',
  templateUrl: './memberdashboard.component.html',
 // styleUrls: ['.././site.component.css']
})
export class MemberdashboardComponent {


  constructor() {
   
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

}


