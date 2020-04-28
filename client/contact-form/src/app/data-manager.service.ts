import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const headers = new HttpHeaders()
  .set('content-type', 'application/json')
  .set('Access-Control-Allow-Origin', '*');

@Injectable({
  providedIn: 'root'
})
export class DataManagerService {

  private url: string = 'http://localhost:3000';
  private httpOptions: any = { headers: headers };

  constructor(private http: HttpClient) { }

  sendMail(form: any) {
    this.http.post<any>(`${this.url}/sendmail`, form, this.httpOptions).subscribe(
      (responseValue) => console.log(responseValue),
      (responseError) => console.error("POST call in error", responseError)
    );
  }
}
