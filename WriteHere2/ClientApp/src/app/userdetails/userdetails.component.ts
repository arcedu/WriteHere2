import { Component, Inject} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User,  Lookup,  StandardResponse } from '../types';


@Component({
  selector: 'app-userdetails-component',
  templateUrl: './userdetails.component.html'
})
export class UserDetailsComponent {
  private _baseUrl: string;
  private _http: HttpClient;
  public loginUser: User;
  public user: User;
  public isEditable: boolean;

  public accordionExpand: boolean[];
  public accordionCount = 4;


  public getUser() {
    try { return JSON.parse(localStorage.getItem('user')) as User; }
    catch { return null; }
  }

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    this._http = http;

    this.accordionExpand = new Array(this.accordionCount).fill(false);
    this.accordionExpand[2] = true;

    const urlParams = new URLSearchParams(window.location.search);
    var userid = urlParams.get('id');
    this.loginUser = this.getUser();

    this.isEditable = this.loginUser.id == userid || this.loginUser.isAdmin;
    if (this.loginUser.id == userid)
    {
      this.user = this.loginUser;
    }
    else {
      this.getUserDetailById(userid);
    }

  }

  public setAccordionSign(index) {
    this.accordionExpand[index] = !this.accordionExpand[index];
  }

  public getAccordionSign(index) {
  
    if (this.accordionExpand[index]) { return '-'; } else { return '+'; }
  }


  public  getUserDetailById(id) {
   
    this._http.get<User>(this._baseUrl + 'api/User/GetUserById/?id=' + id)
      .subscribe(result => {
        this.user = result;
      }, error => console.error(error));

  }

  public updateUserName(){ }
  public updatePassword() { }
  public updateVisiblity() { }
}

