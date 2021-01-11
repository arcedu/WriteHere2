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
  
  public assignment: Assignment;
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
        this.assignment = new Assignment();
        this.assignment.title = 'NEW ASSIGNMENT';
        this.isNewAssignment = true;
        this.isEditor = false;

      }
      else {
        this.assignment = new Assignment();
        this.assignment.title = 'loading ... ';

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
        this.assignment = result;
      

      }, error => console.error(error));
  }

  public saveAssignment() {

      this._http.post(this._baseUrl + 'api/Assignment/', this.assignment)
        .subscribe((res: Assignment) => {
    
          this.assignment = res;
        })
  };

  // still debug. not working
  public acceptAssignment() {
    if (confirm("Once accepted, you cannot change the assignment. \nAre you sure you want to accept the assignment?")) {
      this.assignment.acceptDecline = 1;
      this.saveAssignment();
      this.msg = 'Saved at ' + new Date();
    }
  }

  public rejectAssignment() {
    if (confirm("Once reject, you cannot undo the rejection. \nAre you sure you want to delete the assignment?")) {

      this.assignment.acceptDecline = -1;
      this.saveAssignment();
      this.msg = 'Your request of this article\'s rejection has been processed';
    }
  }


}
