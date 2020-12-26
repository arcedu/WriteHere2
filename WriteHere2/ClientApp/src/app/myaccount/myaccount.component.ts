import { Component } from '@angular/core';

@Component({
  selector: 'app-myaccount-component',
  templateUrl: './myaccount.component.html',
  //styleUrls: ['.././site.component.css']
})
export class MyAccountComponent {

  public redirectTo() {
    location.replace("https://localhost:44347/myaccount")
  }

  }

