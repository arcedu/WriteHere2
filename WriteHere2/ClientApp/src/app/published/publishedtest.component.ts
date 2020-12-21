import { Component } from '@angular/core';

@Component({
  selector: 'app-publishedtest-component',
  templateUrl: './publishedtest.component.html',
})
export class PublishedTestComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
