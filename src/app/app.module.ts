import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { AmChartsModule } from "@amcharts/amcharts3-angular";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ExecuteEtlPage } from '../pages/execute-etl/execute-etl';
import { KpiReportPage } from '../pages/kpi-report/kpi-report';
import { KpiExcelPage } from '../pages/kpi-excel/kpi-excel';
import { CnviReportPage } from '../pages/cnvi-report/cnvi-report';
import { AboutPage } from '../pages/about/about';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { KpiReportAllPage } from '../pages/kpi-report/kpi-report-all/kpi-report-all';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { ScreenOrientation } from '@ionic-native/screen-orientation';
import { EficienciaCobradorPage } from '../pages/cnvi-report/eficiencia-cobrador/eficiencia-cobrador';
import { EficienciaSistemaPage } from '../pages/cnvi-report/eficiencia-sistema/eficiencia-sistema';
import { AforoAnormalPage } from '../pages/cnvi-report/aforo-anormal/aforo-anormal';
import { EficienciaCarrilPage } from '../pages/cnvi-report/eficiencia-carril/eficiencia-carril';
import { IngresoLiquidadoPage } from '../pages/cnvi-report/ingreso-liquidado/ingreso-liquidado';
import { MedicionEfectivoTelepeajePage } from '../pages/cnvi-report/medicion-efectivo-telepeaje/medicion-efectivo-telepeaje';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { SaraiReportServiceProvider } from '../providers/sarai-report-service/sarai-report-service';
import { Network } from '@ionic-native/network';
import { ResumePage } from '../pages/resume/resume';
import { ResumeMonthPage } from '../pages/resume-month/resume-month';

import { File } from '@ionic-native/file';
import { FileTransfer, FileUploadOptions, FileTransferObject  } from '@ionic-native/file-transfer';
import { FileOpener } from '@ionic-native/file-opener';

import { DashboardUnloadPage } from '../pages/dashboard-unload/dashboard-unload';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ExecuteEtlPage,
    KpiReportPage,
    KpiReportAllPage,
    KpiExcelPage,
    CnviReportPage,
    AboutPage,
    ListPage,
    LoginPage,
    DashboardPage,
    EficienciaCobradorPage,
    EficienciaSistemaPage,
    AforoAnormalPage,
    EficienciaCarrilPage,
    IngresoLiquidadoPage,
    MedicionEfectivoTelepeajePage,
    ResumePage,
    ResumeMonthPage,
    DashboardUnloadPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    AmChartsModule,
    FormsModule,
    ReactiveFormsModule,
    // scrollAssist: true,
    // autoFocusAssist: true
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ExecuteEtlPage,
    KpiReportPage,
    KpiReportAllPage,
    KpiExcelPage,
    CnviReportPage,
    AboutPage,
    ListPage,
    LoginPage,
    DashboardPage,
    EficienciaCobradorPage,
    EficienciaSistemaPage,
    AforoAnormalPage,
    EficienciaCarrilPage,
    IngresoLiquidadoPage,
    MedicionEfectivoTelepeajePage,
    ResumePage,
    ResumeMonthPage,
    DashboardUnloadPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ScreenOrientation,
    AuthServiceProvider,
    SaraiReportServiceProvider,
    FileTransfer, 
    FileTransferObject,
    File,
    FileOpener,
    Network
  ]
})
export class AppModule { }
