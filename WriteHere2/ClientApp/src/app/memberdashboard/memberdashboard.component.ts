import { Component } from '@angular/core';

@Component({
  selector: 'app-memberdashboard-component',
  templateUrl: './memberdashboard.component.html'
})
export class MemberdashboardComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
