import { Component } from '@angular/core';

@Component({
  selector: 'app-fileupload-component',
  templateUrl: './fileupload.component.html',
  //styleUrls: ['./site.css']
  //styleUrls: ['.././site.component.css', './fileupload.component.css']
})
export class FileUploadComponent {
  public currentCount = 0;

  public incrementCounter() {
    this.currentCount++;
  }
}
