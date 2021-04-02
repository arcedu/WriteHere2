import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User, Lookup, LookupPack } from '../types';

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
    this.loadLookup();
  }

  public getUser() {
    try { return JSON.parse(localStorage.getItem('user')); }
    catch { return null; }
  }

  public login() {
    this._http.get<User>(this._baseUrl + 'api/User/Login?username=' + this.user.userName
      + '&password=' + this.user.loginPassword)
      .subscribe(result => {
        var loggedUser = result as User;

        if (loggedUser == null) {
          this.user = new User();
          this.msg = 'Login Failed. Please check your username and password';
        }
        else {
          //sucessfully logged in
       
          if (loggedUser.id != null) {
            localStorage.setItem('user', JSON.stringify(loggedUser));
            location.replace("/memberdashboard");

          }
        }
      }, error => console.error(error));


  }
  public loadLookup() {
    this._http.get<LookupPack>(this._baseUrl + 'api/Lookup/GetLookupList?lookupType=genre') 
      .subscribe(result => {
        var genres = result.genre;
        localStorage.setItem('genres', JSON.stringify(genres));
        var ap = result.assignPurpose;
        localStorage.setItem('assignPurposes', JSON.stringify(ap));
        //var bb = JSON.parse(localStorage.getItem('genres')) as Lookup[];

      }, error => console.error(error));
  }
}
