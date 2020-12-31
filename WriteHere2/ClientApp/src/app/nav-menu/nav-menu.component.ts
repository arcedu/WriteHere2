import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  public UserName: string

  constructor() {
    this.UserName = this.getUsername();
  }
  isExpanded = false;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  public logOut() {
    localStorage.setItem('userid', null);
    localStorage.setItem('username', null);
    location.replace("/home");
  }

  public isLoggedIn() {
    var userid = localStorage.getItem('userid');
    return (userid != 'null')
  }

  public getUsername() {
    if (this.isLoggedIn()) {
      return localStorage.getItem('username');
    } else {
      return 'guest';
    }
  }
}
