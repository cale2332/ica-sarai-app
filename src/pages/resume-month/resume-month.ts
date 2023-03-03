import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Loading } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { SaraiReportServiceProvider } from '../../providers/sarai-report-service/sarai-report-service';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';
import { AppGlobals } from '../../app/app.globals';
/**
 * Generated class for the ResumeMonthPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-resume-month',
  templateUrl: 'resume-month.html',
})
export class ResumeMonthPage {
  public reportList: any;
  private loader: Loading;
  private baseApiUrl: string;
  public mesAcumulado: string;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    private serviceProvider: SaraiReportServiceProvider,
    private transfer: FileTransfer, private file: File,
    private fileOpener: FileOpener
  ) {
    this.reportList = [];
    this.baseApiUrl = AppGlobals.getBaseUrl();
  }
  private  fileTransfer: FileTransferObject = this.transfer.create();
  ionViewDidLoad() {
    this.startLoading();
    this.getResumeReports();
    this.stopLoading();
  }

  getResumeReports(): void {
    //this.startLoading();
    this.serviceProvider.getResumeByMonthReports().subscribe(response => {
      if (response && response.diccionarioConcentradoAnioAcumulado) {
        const data = response.diccionarioConcentradoAnioAcumulado;
        this.mesAcumulado = response.mesAcumulado;
        if (data) {
          for (const key of Object.keys(data)) {
            this.reportList.push(
              { key: key, value: data[key][1] }
            );
          } 
      //    this.stopLoading();
        }
        console.log('ionViewDidLoad ResumePage', this.reportList);        
      }
      
    },
      err => {
        //this.stopLoading();
        this.showAlert(err.message);
      });
  }

  goToDashboard() {
    this.navCtrl.setRoot(DashboardPage, {});
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
  
  getDownloadReport() {
  }
}
