import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
//  styleUrls: ['./buttonmargin.component.css', '.././site.component.css' ]
})
export class LoginComponent {
  private _baseUrl: string;
  private _http: HttpClient;
  public user: UserInfo;
  public msg: string;
 

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    this._http = http;
    this.user = new UserInfo();
  }

  public getUsername() { return localStorage.getItem('username');}
  public login() {
   
    this._http.get<UserInfo>(this._baseUrl + 'api/User/Login?username=' + this.user.userName + '&password=' + this.user.password) 
      .subscribe(result => {
        this.user = result;
        if (this.user == null) { this.user = new UserInfo(); }

        if (this.user.id != null) {
          localStorage.user = this.user;
          localStorage.setItem('userid', this.user.id);
          localStorage.setItem('username', this.user.userName);
          location.replace("/memberdashboard");
        } else {
          this.msg = 'Login Failed. Please check your username and password';
        }
      }, error => console.error(error));
   
    
  }
}

// Dev Note: Variable names must match these in api side, expcet make the first letter lower case
export class UserRole {
  id: string;
  roleName: string;
}

export class UserInfo {
  userName: string;
  id: string;

  password: string;
  roles: UserRole[];
  firstName: string;
  lastName: string;
}
