import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {DataManagerService} from '../data-manager.service';

import { faUpload, faPaperclip, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.css']
})
export class ContactFormComponent implements OnInit {
  fileData: any[] = [];
  preview: any[] = [];
  faUpload = faUpload;
  faPaperclip = faPaperclip;
  faAngleDoubleRight = faAngleDoubleRight;

  constructor(private dataManagerService:DataManagerService) { }

  ngOnInit() { }

  onSubmit(form: NgForm) {
    form.value.attachments = this.fileData;
    this.sendMail(form.value);
  }

  onSelectedFile(event) {
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
          this.preview.push(reader.result);
        };
      }
    }
  }

  sendMail(form: any) {
    this.dataManagerService.sendMail(form);
  }
}