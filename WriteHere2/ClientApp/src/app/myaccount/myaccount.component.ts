import { Component } from '@angular/core';

@Component({
  selector: 'app-myaccount-component',
  templateUrl: './myaccount.component.html'
})
export class MyAccountComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
