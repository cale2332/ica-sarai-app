import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { KpiReportAllPage } from '../kpi-report/kpi-report-all/kpi-report-all';
// import { KpiExcelPage } from '../kpi-excel/kpi-excel';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  pushLoginPage: any;
  pushKpiExcelPage:any;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
    this.pushLoginPage = LoginPage;
  }
  searchKpi() {
    this.navCtrl.setRoot(KpiReportAllPage);
  } 
  
  goDashboard(){
    this.navCtrl.setRoot(DashboardPage);
  }
}
