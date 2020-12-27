import { Component } from '@angular/core';

@Component({
  selector: 'app-memberdashboard-component',
  templateUrl: './memberdashboard.component.html',
 // styleUrls: ['.././site.component.css']
})
export class MemberdashboardComponent {
  public redirectToMyAccount() {
    location.replace("/myaccount")
  }
  public redirectToPublished() {
    location.replace("/published")
  }
  public redirectToMyArticles() {
    location.replace("/myarticles")
  }
  }

