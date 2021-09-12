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

  public password1: string; public password2: string;
  public viewpassword: boolean;


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

  public updateUserName() {
    const body = { id: this.user.id, userName: this.user.userName };
    this._http.put<any>(this._baseUrl + 'api/User/UpdateUserName', body)
      .subscribe(result => {
        if (this.user.id = this.loginUser.id) {
          localStorage.setItem('user', JSON.stringify(this.user));
        }
      }, error => console.error(error));
  }

  public updatePassword() {
    if (this.password1 != this.password2) {
      alert("Two password did not match. Please input again.");
    }
    else {
      const body = { id: this.user.id, password: this.password1 };
      this._http.put<any>(this._baseUrl + 'api/User/UpdatePassword', body)
        .subscribe(result => {
          if (this.user.id = this.loginUser.id) {
            localStorage.setItem('user', JSON.stringify(this.user));

          }
        }, error => console.error(error));
    }
  }

  public updateNameandVisibility() {
    const body = {
      id: this.user.id,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      inactive: this.user.inactive,
      showProfile: this.user.showProfile,
      showInHall: this.user.showInHall
    };
    this._http.put<any>(this._baseUrl + 'api/User/UpdatePenNameAndVisibility', body)
      .subscribe(result => {
        localStorage.setItem('user', JSON.stringify(this.user));
      }, error => console.error(error));
  }


  public updateProfile() {
    const body = {
      id: this.user.id,
      penName: this.user.penName,
      email: this.user.email,
      showEmail: this.user.showEmail,
      grade: this.user.grade,
      showGrade: this.user.showGrade,
      country: this.user.country,
      showCountry: this.user.showCountry,
      state: this.user.state,
      showState: this.user.showState,
    };
    this._http.put<any>(this._baseUrl + 'api/User/UpdateProfile', body)
      .subscribe(result => {
        localStorage.setItem('user', JSON.stringify(this.user));
      }, error => console.error(error));
  }
  // admin save user's role and RequestDeclines
  public UpdateRole() {
    const body = {
      id: this.user.id,
      isAdmin: this.user.isAdmin,
      isReader: this.user.isReader,

      isWriter: this.user.isWriter,
      writerAd: this.user.writerAd,
      requestingWriter: this.user.requestingWriter,
      requestWriterDeclined: this.user.requestWriterDeclined,

      isEditor: this.user.isEditor,
      editorAd: this.user.editorAd,
      requestingEditor: this.user.requestingEditor,
      requestEditorDeclined: this.user.requestEditorDeclined,

      isAuditor: this.user.isAuditor,
      requestingAuditor: this.user.requestingAuditor,
      requestAuditorDeclined: this.user.requestAuditorDeclined,

      isDrawer: this.user.isDrawer,
      drawerAd: this.user.drawerAd,
      requestingDrawer: this.user.requestingDrawer,
      requestDrawerDeclined: this.user.requestDrawerDeclined,

      isTutor: this.user.isTutor,
      tutorAd: this.user.tutorAd,
      requestingTutor: this.user.requestingTutor,
      requestTutorDeclined: this.user.requestTutorDeclined
    };
    this._http.put<any>(this._baseUrl + 'api/User/UpdateRole', body)
      .subscribe(result => {
        localStorage.setItem('user', JSON.stringify(this.user));
      }, error => console.error(error));
  }

  // user save  requests and ads
  public UpdateRequesting() {
    const body = {
      id: this.user.id,
      writerAd: this.user.writerAd,
      requestingWriter: this.user.requestingWriter,
      editorAd: this.user.editorAd,
      requestingEditor: this.user.requestingEditor,
      requestingAuditor: this.user.requestingAuditor,
      drawerAd: this.user.drawerAd,
      requestingDrawer: this.user.requestingDrawer,
      tutorAd: this.user.tutorAd,
      requestingTutor: this.user.requestingTutor,
    };
    this._http.put<any>(this._baseUrl + 'api/User/UpdateRole', body)
      .subscribe(result => {
        localStorage.setItem('user', JSON.stringify(this.user));
      }, error => console.error(error));
  }
}

