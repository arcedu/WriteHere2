import { Component } from '@angular/core';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
//  styleUrls: ['./buttonmargin.component.css', '.././site.component.css' ]
})
export class LoginComponent {
  public currentCount = 0;

  public redirectTo() {
 
    location.replace("https://localhost:44347/memberdashboard")

  }
}
