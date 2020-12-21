import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutus-component',
  templateUrl: './aboutus.component.html'
})
export class AboutUsComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
