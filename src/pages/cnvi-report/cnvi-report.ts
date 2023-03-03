import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Loading, ViewController, DateTime } from 'ionic-angular';
import { EficienciaCobradorPage } from './eficiencia-cobrador/eficiencia-cobrador';
import { EficienciaSistemaPage } from './eficiencia-sistema/eficiencia-sistema';
import { AforoAnormalPage } from './aforo-anormal/aforo-anormal';
import { EficienciaCarrilPage } from './eficiencia-carril/eficiencia-carril';
import { IngresoLiquidadoPage } from './ingreso-liquidado/ingreso-liquidado';
import { MedicionEfectivoTelepeajePage } from './medicion-efectivo-telepeaje/medicion-efectivo-telepeaje';
import { SaraiReportServiceProvider } from '../../providers/sarai-report-service/sarai-report-service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import moment from 'moment';

/**
 * Generated class for the CnviReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cnvi-report',
  templateUrl: 'cnvi-report.html',
})
export class CnviReportPage {
  private cnviReportForm: FormGroup;
  private catalogs: any = {};
  private loader: Loading;
  private startDate: any;
  private startDateMin: any;
  private startDateMax: any;
  private endDateMin:   any;
  private endDateMax:   any;
  private dateNow: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public formBuilder: FormBuilder,
    private serviceProvider: SaraiReportServiceProvider,
    public viewCtrl: ViewController
  ) {
  }


  ionViewWillLoad() {
    this.viewCtrl.setBackButtonText('Dashboard');
    
    this.dateNow = moment().format('YYYY-MM-DD');
    this.startDate = moment().startOf('month').format('YYYY-MM-DD'); 
    this.startDateMin = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD'); 
    this.startDateMax = this.dateNow;

    this.endDateMin = moment().subtract(1, 'months').startOf('month').format('YYYY-MM-DD');
    this.endDateMax = this.dateNow;

    this.cnviReportForm = this.formBuilder.group({
      reporteId: new FormControl(0, Validators.required),
      proyectoId: new FormControl(1, Validators.required),
      fechaInicio: new FormControl(this.startDate, Validators.required),
      fechaFin: new FormControl(this.endDateMax, Validators.required)
    }, { validator: this.dateLessThan('fechaInicio', 'fechaFin') });
  }
  //
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
    this.getCatalogs();
  }

  getCatalogs(): void {
    this.startLoading();
    this.serviceProvider.getCatalogs().subscribe(response => {
      if (response) {
        this.catalogs = response;
      }
      else {
        this.showAlert("NO CATALOG!");
      }
      this.stopLoading();
    },
      err => {
        this.stopLoading();
        this.cnviReportForm.controls['reporteId'].setValue('');
        this.cnviReportForm.controls['proyectoId'].setValue('');
        this.showAlert(err.message);
      });
  }

  onSubmit(values) {

    const request: any = {
      reporteId: values.reporteId,
      proyectoId: values.proyectoId,
      fechaInicio: values.fechaInicio,
      fechaFin: values.fechaFin
    };

    this.startLoading();
    this.serviceProvider.getCnviReports(request).subscribe(response => {
      this.stopLoading();
      console.log("inicio " + response.fechaInicio);
      console.log("Fin  " + response.fechaFin);
      if (response) {
        switch (values.reporteId) {
          case 0:
            this.navCtrl.push(AforoAnormalPage, { data: response });
            break;
          case 1:
            this.navCtrl.push(EficienciaSistemaPage, { data: response });
            break;
          case 2:
            this.navCtrl.push(EficienciaCobradorPage, { data: response });
            break;
          case 3:
            this.navCtrl.push(EficienciaCarrilPage, { data: response });
            break;
          case 4:
            this.navCtrl.push(IngresoLiquidadoPage, { data: response });
            break;
          case 5:
            this.navCtrl.push(MedicionEfectivoTelepeajePage, { data: response });
            break;
          default:
            this.showAlert('Este Reporte Aun no esta Implementado');
            break;
        }
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

  get fechaInicio(): string {
    return this.cnviReportForm.controls['fechaInicio'].value;
  }


}


