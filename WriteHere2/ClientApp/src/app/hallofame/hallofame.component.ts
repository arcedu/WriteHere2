import { Component } from '@angular/core';

@Component({
  selector: 'app-hallofame-component',
  templateUrl: './hallofame.component.html',
  //styleUrls: ['./site.css']
  //styleUrls: ['.././site.component.css']
})
export class HallOFameComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
