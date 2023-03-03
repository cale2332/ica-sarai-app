import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { AboutPage } from '../pages/about/about';
import { ExecuteEtlPage } from '../pages/execute-etl/execute-etl';
import { KpiExcelPage } from '../pages/kpi-excel/kpi-excel';
import { KpiReportPage } from '../pages/kpi-report/kpi-report';
import { CnviReportPage } from '../pages/cnvi-report/cnvi-report';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { EficienciaCobradorPage } from '../pages/cnvi-report/eficiencia-cobrador/eficiencia-cobrador';
import { AforoAnormalPage } from '../pages/cnvi-report/aforo-anormal/aforo-anormal';
import { EficienciaSistemaPage } from '../pages/cnvi-report/eficiencia-sistema/eficiencia-sistema';
import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;
  //rootPage: any = ListPage;

  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Inicio', component: HomePage },
      { title: 'Ejecutar ETL', component: ExecuteEtlPage },
      { title: 'Reportes A&I', component: KpiReportPage },
      { title: 'Descargar Excel', component: KpiExcelPage },
      { title: 'Reportes CNVI', component: CnviReportPage },
      { title: 'Acerca de...', component: AboutPage },
      { title: 'Eficiencia Cobrador...', component: EficienciaCobradorPage },
      { title: 'Eficiencia Sistema...', component: EficienciaSistemaPage },
      { title: 'Aforo Anormal', component: AforoAnormalPage },
      { title: 'Dashboard', component: DashboardPage },
      { title: 'List...', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
