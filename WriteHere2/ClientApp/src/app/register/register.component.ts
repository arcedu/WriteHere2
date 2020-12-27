import { Component } from '@angular/core';

@Component({
  selector: 'app-register-component',
  templateUrl: './register.component.html',
 // styleUrls: ['.././site.component.css']
})
export class RegisterComponent {


    public redirectTo() {

    location.replace("/memberdashboard")

  
  }
}
