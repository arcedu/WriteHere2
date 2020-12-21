import { Component } from '@angular/core';

@Component({
  selector: 'app-unpublishedtest-component',
  templateUrl: './unpublishedtest.component.html'
})
export class UnpublishedtestComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
