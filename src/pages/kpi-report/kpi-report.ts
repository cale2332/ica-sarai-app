import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { SaraiReportServiceProvider } from '../../providers/sarai-report-service/sarai-report-service';
import { Loading } from 'ionic-angular/components/loading/loading';
import { KpiReportAllPage } from './kpi-report-all/kpi-report-all';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import moment from 'moment';
//import { KeyValuePair } from '../../models/key-value-pair';
// import { SaraiReportServiceProvider } from '../../providers/sarai-report-service/sarai-report-service';
/**
 * Generated class for the KpiReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-kpi-report',
  templateUrl: 'kpi-report.html',
})
export class KpiReportPage {
  private kpiReportForm: FormGroup;
  private catalogs: any = {};
  private years: any[] = [];
  private months: any[] = [];
  private loader: Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    private serviceProvider: SaraiReportServiceProvider,
    public viewCtrl: ViewController) {
  }

  ionViewWillLoad() {
    let date = moment().add(-1, 'M');
    this.kpiReportForm = this.formBuilder.group({
      proyectoId: new FormControl(1, Validators.required),
      anioInicio: new FormControl(2016, Validators.required),
      anioFin: new FormControl(date.get('year'), Validators.required),
      mes: new FormControl(date.get('month') + 1, Validators.required)
    }, { validator: this.dateLessThan('anioInicio', 'anioFin') });
  }

  dateLessThan(from: string, to: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let f = group.controls[from];
      let t = group.controls[to];
      if (f.value > t.value) {
        return {
          dates: "Date from should be less than Date to"
        };
      } else {
      }
      return {};
    }
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('Dashboard');
    this.getYears();
    this.getMonths();
    this.getCatalogs();
  }

  getYears(): void {
    this.years = this.serviceProvider.getYears();
  }

  getMonths(): void {
    this.months = this.serviceProvider.getMonths();
  }

  getCatalogs(): void {
    this.startLoading();
    this.serviceProvider.getCatalogs().subscribe(response => {
      if (response) {
        this.catalogs = response;
      }
      this.stopLoading();
    },
      err => {
        this.stopLoading();
        this.kpiReportForm.controls['proyectoId'].setValue('');
        this.showAlert(err.message);
      });
  }


  onSubmit(values) {
    const request: any = {
      proyectoId: values.proyectoId,
      anioInicio: values.anioInicio,
      anio: values.anioFin,
      mes: values.mes
    };
    this.startLoading();
    this.serviceProvider.getKpiReports(request).subscribe(response => {
      this.stopLoading();
      if (response) {
        this.navCtrl.push(KpiReportAllPage, { chartData: response });
      }
      else {
        this.showAlert('no se encontró resultados');
      }
    },
      err => {
        this.stopLoading();
        this.showAlert(err.message);
      });
  }

  startLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Please wait..."
    });
    this.loader.present();
  }

  stopLoading() {
    if (this.loader) {
      this.loader.dismiss();
    }
  }

  showAlert(message: string) {
    let alert = this.alertCtrl.create({
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

}
