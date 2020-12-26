import { Component } from '@angular/core';

@Component({
  selector: 'app-publishedtest-component',
  templateUrl: './publishedtest.component.html',
 // styleUrls: ['.././site.component.css']
})
export class PublishedTestComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
