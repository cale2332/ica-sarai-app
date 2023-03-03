import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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
import { DashboardUnloadPage } from '../dashboard-unload/dashboard-unload';


/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
  pushLoginPage: any;
  pushAboutPage: any;
  pushKpiExcelPage: any;
  pushExecuteEtlPage: any;
  pushKpiReportPage: any;
  pushCnviReportPage: any;
  connectSubscription: Subscription;
  disconnectSubscription: Subscription;
  pushDashBoardUnloadPage: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private network: Network,
    public authService: AuthServiceProvider) {
    this.pushLoginPage = LoginPage;
    this.pushAboutPage = AboutPage;
    this.pushKpiExcelPage = KpiExcelPage;
    this.pushExecuteEtlPage = ExecuteEtlPage;
    this.pushKpiReportPage = KpiReportPage;
    this.pushCnviReportPage = CnviReportPage;
    this.pushDashBoardUnloadPage = DashboardUnloadPage;
  }

  ionViewDidLoad() {
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
    console.log('goToResumePage :-)');
    this.navCtrl.setRoot(DashboardUnloadPage, {});
  }
  logOut() {
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage, {});
  }

  ngOnDestroy() {
    this.connectSubscription.unsubscribe();
    this.disconnectSubscription.unsubscribe();
  }

}
