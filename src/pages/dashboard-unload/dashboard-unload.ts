import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AboutPage } from '../about/about';
import { KpiExcelPage } from '../kpi-excel/kpi-excel';
import { ExecuteEtlPage } from '../execute-etl/execute-etl';
import { KpiReportPage } from '../kpi-report/kpi-report';
import { CnviReportPage } from '../cnvi-report/cnvi-report';
import { Network } from '@ionic-native/network';
import { Subscription } from 'rxjs/Subscription';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { ResumePage } from '../resume/resume';
import { ResumeMonthPage } from '../resume-month/resume-month';
import { DashboardPage } from '../dashboard/dashboard';
import { AppGlobals } from '../../app/app.globals';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

/**
 * Generated class for the DashboardUnloadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard-unload',
  templateUrl: 'dashboard-unload.html',
})
export class DashboardUnloadPage {
  pushLoginPage: any;
  pushAboutPage: any;
  pushKpiExcelPage: any;
  pushExecuteEtlPage: any;
  pushKpiReportPage: any;
  pushCnviReportPage: any;
  connectSubscription: Subscription;
  disconnectSubscription: Subscription;
  private baseApiUrl: string;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private network: Network,
    public authService: AuthServiceProvider,
    public alertCtrl: AlertController,
    private transfer: FileTransfer, private file: File,
    private fileOpener: FileOpener,
    public viewCtrl: ViewController) {
    this.pushLoginPage = LoginPage;
    this.pushAboutPage = AboutPage;
    this.pushKpiExcelPage = KpiExcelPage;
    this.pushExecuteEtlPage = ExecuteEtlPage;
    this.pushKpiReportPage = KpiReportPage;
    this.pushCnviReportPage = CnviReportPage;
    this.baseApiUrl = AppGlobals.getBaseUrl();
  }
  private  fileTransfer: FileTransferObject = this.transfer.create();
  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('Dashboard');
    // watch network for a connection
    this.connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected! ', this.network.type);
      // We just got a connection but we need to wait briefly
      // before we determine the connection type. Might need to wait.
      // prior to doing any api requests as well.
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          console.log('we got a wifi connection, woohoo!');
        }
      }, 3000);
    });

    // watch network for a disconnect
    this.disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      console.log('network was disconnected :-(');
    });
  }

  goToResumePage(){
    this.navCtrl.setRoot(ResumePage, {});
  }

  goToResumeByMonthPage(){
    this.navCtrl.setRoot(ResumeMonthPage, {});
  }
  logOut() {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage, {});
  }

  ngOnDestroy() {
    this.connectSubscription.unsubscribe();
    this.disconnectSubscription.unsubscribe();
  }

  goToDashboard() {
    this.navCtrl.setRoot(DashboardPage, {});
  }
  getDownloadReportAnnual() {
    this.fileTransfer.download(this.baseApiUrl + 'pdfReports2017.pdf', this.file.dataDirectory + 'reporteAforoIngresoAnual.pdf').then((entry) => {
      this.fileOpener.open(this.file.dataDirectory + 'reporteAforoIngresoAnual.pdf', 'application/pdf')
      .then(() => console.log('File is opened'))
      .catch(e => console.log('Error opening file', e));
          
        }, (error) => {
          this.showAlert(error.message);
        });
        }

  getDownloadReportResume() {
    this.fileTransfer.download(this.baseApiUrl + 'pdfReports.pdf', this.file.dataDirectory + 'reporteAforoIngreso.pdf').then((entry) => {
    this.fileOpener.open(this.file.dataDirectory + 'reporteAforoIngreso.pdf', 'application/pdf')
    .then(() => console.log('File is opened'))
    .catch(e => console.log('Error opening file', e));
        
      }, (error) => {
        this.showAlert(error.message);
      });
    }
    showAlert(message: string) {
      let alert = this.alertCtrl.create({
        subTitle: message,
        buttons: ['OK']
      });
      alert.present();
    }
}
