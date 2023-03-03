import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/catch';
import { AppGlobals } from '../../app/app.globals';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';


/*
  Generated class for the SaraiReportServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SaraiReportServiceProvider {
  private baseApiUrl: string;
  constructor(public httpClient: HttpClient) {
    this.baseApiUrl = AppGlobals.getBaseUrl() + 'sarai/reports/';
  }

  getCatalogs() {
    return this.httpClient
      .get<any>(this.baseApiUrl + 'catalogs', { headers: this.setHeader() })
      .catch(this.handleError);
  }


  getKpiReports(request: any) {
    return this.httpClient
      .get<any>(this.baseApiUrl + 'kpireport', { params: request, headers: this.setHeader() })
      .catch(this.handleError);
  }

  getCnviReports(request: any) {
    return this.httpClient
      .get<any>(this.baseApiUrl + 'cnvireport', { params: request, headers: this.setHeader() })
      .catch(this.handleError);
  }

  getResumeReports() {

    console.log(' U  R L : ', this.baseApiUrl + 'resume'); 
    return this.httpClient
      .get<any>(this.baseApiUrl + 'resume', { headers: this.setHeader() })
      .catch(this.handleError);
  }

  getResumeByMonthReports() {

    console.log(' U  R L : ', this.baseApiUrl + 'resume'); 
    return this.httpClient
      .get<any>(this.baseApiUrl + 'resumeByMonth', { headers: this.setHeader() })
      .catch(this.handleError);
  }
  getDownloadReport() {

  
    return this.httpClient
      .get<any>(this.baseApiUrl + 'downloadReport', { headers: this.setHeader() })
      .catch(this.handleError);
  }


  getYears() {
    let year = 2016;
    let years: any[] = [];
    for (let index = 0; index < 10; index++) {
      years.push(year);
      year++;
    }
    return years;
  }


  getMonths() {
    let month = 1;
    let months: any[] = [];
    for (let index = 0; index < 12; index++) {
      months.push(month);
      month++;
    }
    return months;
  }


  setHeader() {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'bearer ' + localStorage.getItem('token')
    });
  }


  private handleError(error: HttpErrorResponse | any) {
    let err_message = '';

    if (error.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      err_message = AppGlobals.MSG_NETWORK_API;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      err_message = AppGlobals.MSG_CONTACT_ADMIN;
      if (error.status === 401) {
        err_message = AppGlobals.MSG_NOT_AUTHORIZED_API;
      }
      if (error.status === 0) {
        err_message = AppGlobals.MSG_NETWORK_API;
      }
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable({ message: err_message });
  }


}

