import { Component } from '@angular/core';
import { User } from '../types';

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
    localStorage.clear();
    location.replace("/home");
  }

  public getUser() {
    try {return JSON.parse(localStorage.getItem('user')) as User;    }
    catch { return null; }
  }

  public isLoggedIn() {
    return this.getUser() != null;
  }

  public getUsername() {
    var user = this.getUser();
    if (user == null) { return 'guest'; }
    else {
      return user.userName;
    } 
     

  }
}
