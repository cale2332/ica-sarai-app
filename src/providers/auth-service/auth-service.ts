// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { AppGlobals } from '../../app/app.globals';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
 
export class LoginResponse {
  token: string;
  user: string;
  success: boolean;   
}


@Injectable()
export class AuthServiceProvider {
  private tokenUrl: string;
  constructor(public httpClient: HttpClient) {
    this.tokenUrl =  AppGlobals.getBaseUrl() + 'sarai/token';
  }

  login(data) {
    return this.httpClient.post<LoginResponse>(this.tokenUrl, data)
      .map((res) => {
        if(res.success === true){
          localStorage.setItem('token', res.token);
        };
        return res.success;
      });
  }

  logout() {
    localStorage.removeItem('token');
    return true;
  }

}
