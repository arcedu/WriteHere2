import { Component } from '@angular/core';

@Component({
  selector: 'app-memberdashboard-component',
  templateUrl: './memberdashboard.component.html',
 // styleUrls: ['.././site.component.css']
})
export class MemberdashboardComponent {
  public redirectToMyAccount() {
    location.replace("https://localhost:44347/myaccount")
  }
  public redirectToPublished() {
    location.replace("https://localhost:44347/published")
  }
  public redirectToMyArticles() {
    location.replace("https://localhost:44347/myarticles")
  }
  }

