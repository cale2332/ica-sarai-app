import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { DashboardPage } from '../dashboard/dashboard';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AppGlobals } from '../../app/app.globals';
import { ResumeMonthPage } from '../resume-month/resume-month';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  loginForm: FormGroup;
  toastOptions: any;


  constructor(
    public navCtrl: NavController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public authService: AuthServiceProvider) {
    this.toastOptions = {
      duration: 3000,
      position: 'bottom'
    }
  }

  ionViewWillLoad() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      grant_type: 'password'
    });
  }
  ionViewDidLoad() {

  }

  public createAccount() {
    this.navCtrl.push('RegisterPage');
  }

  public onSubmit(user) {
    console.log(user);
    let loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });

    loading.present();
    this.navCtrl.setRoot(ResumeMonthPage, {});
    // this.authService.login(user).subscribe(allowed => {
    //   loading.dismiss();
    //   console.log(allowed);
    //   // if (allowed===true) {
    //      this.navCtrl.setRoot(ResumeMonthPage, {});
    //   // }
    //   // else {
    //   //   this.toastOptions.message = AppGlobals.MSG_LOGIN_FAILED;
    //   //   let toast = this.toastCtrl.create(this.toastOptions);
    //   //   toast.present();
    //   // }
    // },
    //   error => {
    //     console.log(error);
    //     loading.dismiss();
    //     this.toastOptions.message = AppGlobals.MSG_CONTACT_ADMIN;
    //     let toast = this.toastCtrl.create(this.toastOptions);
    //     toast.present();
    //   });

  }

}
