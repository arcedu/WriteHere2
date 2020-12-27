import { Component } from '@angular/core';

@Component({
  selector: 'app-writearticle-component',
  templateUrl: './writearticle.component.html',
 // styleUrls: ['.././site.component.css']
})
export class writearticleComponent {
  public currentCount = 0;

  public redirectTo() {
 
    location.replace("/memberdashboard")

  }
  public redirectToFiles() {
    location.replace("/filewritearticle")
  }
}
