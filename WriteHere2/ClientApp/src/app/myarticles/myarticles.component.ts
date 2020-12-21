import { Component } from '@angular/core';

@Component({
  selector: 'app-myarticles-component',
  templateUrl: './myarticles.component.html'
})
export class MyArticlesComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
