import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

const httpOptions = {
  headers: headers
};

@Component({
  selector: 'app-fault-form',
  templateUrl: './fault-form.component.html',
  styleUrls: ['./fault-form.component.css'],
  providers: [HttpClient]
})
export class FaultFormComponent implements OnInit {
  fileData: any;

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    console.log(form.value);
    form.value.attachments = this.fileData;
    console.log(form.value);
    this.sendMail(form.value);
  }

  onFileSelected(event) {
    const reader: any = new FileReader();
    const input: HTMLInputElement = event.target;
    if (input.files && input.files.length > 0) {
      const file: File = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.fileData = {
          filename: file.name,
          content: reader.result.split(',')[1]
        }
      };
    }
  }

  sendMail(form: any) {
    this.http.post<any>('http://localhost:3000/sendmail', form, httpOptions).subscribe(
      (responseValue) => console.log(responseValue),
      (responseError) => console.error("POST call in error", responseError)
    );
  }
}
