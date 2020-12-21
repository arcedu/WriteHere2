import { Component } from '@angular/core';

@Component({
  selector: 'app-register-component',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
