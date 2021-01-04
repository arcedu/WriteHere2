import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../types';

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

  public getUser() {
    try { return JSON.parse(localStorage.getItem('user')) as User; }
    catch { return null; }
  }

  public getAssignmentList() {
    var user = this.getUser();
    if (user != null) {
      this._http.get<Assignment[]>(this._baseUrl + 'api/Article/GetAssignmentList?userid=' + user.id)
        .subscribe(result => {
          this.assignments = result;
        }, error => console.error(error));
    }
  }
}

interface Assignment {
  id: string;
  title: string;
  subtitle: string;
  articleStatus: string;
  authorDisplayName: string;
  assignedDate: Date;
  authorUserId: string;
  editorUserId: string;
}
