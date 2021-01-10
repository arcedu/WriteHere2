import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
 // providers: [User],
//  styleUrls: ['./buttonmargin.component.css', '.././site.component.css' ]
})

export class LoginComponent {
  private _baseUrl: string;
  private _http: HttpClient;
  public user: User;
  public msg: string;
    

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    this._http = http;
    this.user = new User();
  }

  public getUser() {
    try { return JSON.parse(localStorage.getItem('user')); }
    catch { return null; }
  }
  
  public login() {
    alert('login');

    this._http.get<User>(this._baseUrl + 'api/User/Login?username=' + this.user.userName
      + '&password=' + this.user.loginPassword) 
      .subscribe(result => {
        var loggedUser = result as User;
       
        if (loggedUser == null) {
          this.user = new User();
        }
        else {
          if (loggedUser.id != null) {
            localStorage.setItem('user', JSON.stringify(loggedUser));
            location.replace("/memberdashboard");
          } else {
            this.msg = 'Login Failed. Please check your username and password';
          }
        }
      }, error => console.error(error));
  }
}
