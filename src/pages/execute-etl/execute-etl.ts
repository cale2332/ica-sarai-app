import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SaraiReportServiceProvider } from '../../providers/sarai-report-service/sarai-report-service';
import moment from 'moment';
/**
 * Generated class for the ExecuteEtlPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-execute-etl',
  templateUrl: 'execute-etl.html',
})
export class ExecuteEtlPage {
  private ejecutarEtlForm: FormGroup;
  private years: any[] = [];
  private months: any[] = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    private serviceProvider: SaraiReportServiceProvider) {
  }

  ionViewWillLoad() {    
    let date = moment().add(-1, 'M');
    this.ejecutarEtlForm = this.formBuilder.group({
      mesId: new FormControl(date.get('month') + 1, Validators.required),
      anioId: new FormControl(date.get('year'), Validators.required)
    });
  }

  ionViewDidLoad() {
    this.getYears();
    this.getMonths();
  }

  getYears(): void {
    this.years = this.serviceProvider.getYears();
    console.log(this.years);
  }

  getMonths(): void {
    this.months = this.serviceProvider.getMonths();
    console.log(this.months);
  }

  ejecutarEtl(): void {
    let loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loader.present();

    //llamada de la api
    setTimeout(() => {
      loader.dismiss();
      this.showAlert();
    }, 3000);
  }

  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'New Friend!',
      subTitle: 'Your friend, Obi wan Kenobi, just accepted your friend request!',
      buttons: ['OK']
    });
    alert.present();
  }

}
