import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-myassignments-component',
  templateUrl: './myassignments.component.html',
  //styleUrls: ['.././site.component.css']
})
export class MyAssignmentsComponent {
  private _baseUrl: string;
  private _http: HttpClient;


  public assignments: Assignment[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this._baseUrl = baseUrl;
    this._http = http;

    this.getAssignmentList();
  }
  public getUsername() { return localStorage.getItem('username'); }
  public getUserId() { return localStorage.getItem('userid'); }

  public getAssignmentList() {
    var userid = this.getUserId();

    this._http.get<Assignment[]>(this._baseUrl + 'api/Article/GetAssignmentList?userid=' + userid)
      .subscribe(result => {
      this.assignments = result;
    }, error => console.error(error));
  }

}

interface Assignment {
  id: string;
  title: string;
  subtitle: string;
  articleStatus: string;
  authorDisplayName: string;
  assignmentDate: Date;
  authorUserId: string;
  editorUserId: string;
}
