import { Component } from '@angular/core';

@Component({
  selector: 'app-published-component',
  templateUrl: './published.component.html'
})
export class PublishedComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
