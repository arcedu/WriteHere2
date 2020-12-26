import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-component',
  templateUrl: './upload.component.html',
 // styleUrls: ['.././site.component.css']
})
export class UploadComponent {
  public currentCount = 0;

  public redirectTo() {
 
    location.replace("https://localhost:44347/memberdashboard")

  }
  public redirectToFiles() {
    location.replace("https://localhost:44347/fileupload")
  }
}
