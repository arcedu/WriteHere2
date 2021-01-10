import { Component, Inject} from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { User, Assignment } from '../types';

@Component({
  selector: 'app-assignmentdetails-component',
  templateUrl: './assignmentdetails.component.html',
})


export class AssignmentDetailsComponent{
  private _baseUrl: string;
  private _http: HttpClient;
  
  public Assignment: Assignment;
  public msg: string;
  public user: User;
  public isEditor: boolean;
  public isWriter: boolean;
  public isNewAssignment: boolean;

  public getUser() {
    try { return JSON.parse(localStorage.getItem('user')) as User; }
    catch { return null; }
  }

  constructor(http: HttpClient,
    @Inject('BASE_URL') baseUrl: string) {

    const urlParams = new URLSearchParams(window.location.search);
    var assignmentid = urlParams.get('id');
    this.user = this.getUser();
    if (this.user != null) {
      if (assignmentid == null && this.isWriter) {
        this.Assignment = new Assignment();
        this.Assignment.title = 'NEW assignment';
        this.isNewAssignment = true;
        this.isEditor = false;

      }
      else {
        this.Assignment = new Assignment();
        this.Assignment.title = 'loading ... ';

        this.isNewAssignment = false;
        this._baseUrl = baseUrl;
        this._http = http;
        this.getAssignment(assignmentid);
      }
    }
  }
  
  public getAssignment(id) {
    this._http.get<Assignment>(this._baseUrl + 'api/Assignment/GetAssignment?id=' + id)
      .subscribe(result => {
        this.Assignment = result;
      

      }, error => console.error(error));
  }

  public saveAssignment() {

    //this.Assignment.ownerUserId = this.user.id;
      this._http.post(this._baseUrl + 'api/Article/', this.Assignment)
        .subscribe((res: Assignment) => {
    
          this.Assignment = res;
          this.msg = 'Saved at ' + new Date();
        })
  };

  // still debug. not working
  public acceptAssignment() {
    if (confirm("Once accepted, you cannot change the assignment. \nAre you sure you want to accept the assignment?")) {

      this._http.get(this._baseUrl + 'api/Assignment/sumbitAssignment')
        .subscribe((res: Assignment) => {
          this.Assignment = res;
          this.msg = 'Submitted at ' + new Date();
        })
    }
  }

  public rejectAssignment() {
    if (confirm("Once reject, you cannot undo the rejection. \nAre you sure you want to delete the assignment?")) {

      this._http.delete(this._baseUrl + 'api/Assignment/' + this.Assignment.id )
        .subscribe((res: Assignment) => {
          this.Assignment = res;
          this.msg = 'Rejected at ' + new Date();
        })
    }
  }


}
