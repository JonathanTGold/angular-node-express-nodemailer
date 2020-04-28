import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {DataManagerService} from '../data-manager.service';

import { faUpload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  fileData: any[] = [];
  faUpload = faUpload;

  constructor(private dataManagerService:DataManagerService) { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    console.log(form.value);
    form.value.attachments = this.fileData;
    console.log(form.value);
    this.sendMail(form.value);
  }

  onFileSelected(event) {
    const files: File[] = event.target.files;
    if (files && files.length > 0) {
      for (let file of files) {
        const reader: any = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const fileData = {
            filename: file.name,
            content: reader.result.split(',')[1]
          }
          this.fileData.push(fileData);
        };
      }
    }
  }

  sendMail(form: any) {
    this.dataManagerService.sendMail(form);
  }
}
