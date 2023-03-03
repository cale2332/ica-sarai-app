import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AmChartsService } from "@amcharts/amcharts3-angular";
import { ScreenOrientation } from '@ionic-native/screen-orientation';
// import { KeyValuePair } from '../../../models/key-value-pair';

/**
 * Generated class for the KpiReportAllPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-kpi-report-all',
  templateUrl: 'kpi-report-all.html',
})
export class KpiReportAllPage {
  public concentradoList: any[];
  public tdpaChartData: any[];
  public reporteConcentrado: any[];
  public ingresoChartData: any[];
  public telepeajeChartData: any[];
  private chartTitle = "";
  private proyecto: '';
  private periodo: any;
  private sot: any = 1;
  private deltasInfo: any = {};
  private proyectoId: number;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private screenOrientation: ScreenOrientation,
    private AmCharts: AmChartsService,
    public viewCtrl: ViewController
  ) {
    let data = navParams.get("chartData");
    if (data) {
      this.concentradoList = data.concentradoList;
      this.reporteConcentrado = data.reporteConcentradoList;
      this.tdpaChartData = data.tdpaChartDataList;
      this.ingresoChartData = data.ingresoChartDataList;
      this.telepeajeChartData = data.telepeajeChartDataList;
      this.chartTitle = `al mes ${data.mesTexto} ${data.anio}`;
      this.proyecto = data.proyecto;
      this.proyectoId = data.proyectoId;
      this.periodo = {
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin
      };
      if (this.reporteConcentrado &&
        this.reporteConcentrado.length &&
        this.reporteConcentrado.length > 1) {
        this.deltasInfo = this.reporteConcentrado[1];
      }
      console.log(data);
      this.getScreenOrientation();
      this.screenOrientation.onChange().subscribe(
        () => {
          this.getScreenOrientation();
        }
      );

    }
  }


  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('Búsqueda');
    try {
      this.lineChart();
      this.tdpaChart();
      this.ingresoChart();
      this.efectivoTelepeajeChart();
    } catch (error) {
      console.log(error);
    }



  }


  lineChart(): void {
    var ingresoAxisMax: number = 34;
    var tdpaAxisMax: number = 11500;
    switch (Number(this.proyectoId)) {
      case 1:
        ingresoAxisMax = 34;
        tdpaAxisMax = 11500;
        break;
      case 2:
        ingresoAxisMax = 50;
        tdpaAxisMax = 35000;
        break;
      case 3:
        ingresoAxisMax = 30;
        tdpaAxisMax = 8500;
        break;
      case 4:
        ingresoAxisMax = 35;
        tdpaAxisMax = 4200;
        break;
      case 5:
        ingresoAxisMax = 125;
        tdpaAxisMax = 3600;
        break;
      case 6:
        ingresoAxisMax = 90;
        tdpaAxisMax = 15000;
        break;
      case 7:
        ingresoAxisMax = 70;
        tdpaAxisMax = 16000;
        break;
    }

    this.AmCharts.makeChart("chartdiv", {
      // SERIAL CHART
      type: "serial",
      theme: "light",
      dataProvider: this.concentradoList,
      marginRight: 15,
      autoMarginOffset: 10,
      categoryField: "fecha",
      dataDateFormat: "YYYY-MM-DD",
      language: "es",
      color: "#327EB1",
      mouseWheelZoomEnabled: false,
      legend: {
        useGraphSettings: true,
        position: "bottom",
        align: "center",
        color: "#327EB1",
      },
      //==========


      // AXES
      // category
      categoryAxis: {
        parseDates: true, // as our data is date-based, we set parseDates to true
        minPeriod: "MM", // our data is daily, so we set minPeriod to DD
        gridAlpha: 0.1,
        minorGridAlpha: 0.1,
        axisAlpha: 0,
        minorGridEnabled: true,
        labelRotation: 45,
        titleColor: "#327EB1",
        labelColor: "#327EB1",
        gridColor: '#ddd',
        dateFormats: [{
          period: 'DD',
          format: 'MMM DD'
        }, {
          period: 'WW',
          format: 'MMM DD'
        }, {
          period: 'MM',
          format: 'MMM-YYYY'
        }, {
          period: 'YYYY',
          format: 'YYYY'
        }]
      },


      // INGRESO INFO
      //axis
      valueAxes: [{
        id: "ingresoValueAxis",
        title: "Ingresos MDP",
        titleColor: "#327EB1",
        position: "left",
        axisColor: "#327EB1",
        minimum: 0,
        autoGridCount: true,
        tickLength: 0,
        axisAlpha: 0,
        showFirstLabel: true,
        showLastLabel: true,
        color: '#327EB1',
        gridColor: '#ddd',
        gridThickness: 0,
        maximum: ingresoAxisMax
      }, {
        id: "tdpaValueAxis",
        title: "TDPA",
        titleColor: "#ff0000",
        position: "right", // th
        axisColor: "#327EB1",
        minimum: 0,
        autoGridCount: true,
        tickLength: 0,
        axisAlpha: 0,
        showFirstLabel: true,
        color: '#327EB1',
        gridColor: '#ddd',
        gridThickness: 0,
        showLastLabel: true,
        maximum: tdpaAxisMax
      }],

      graphs: [{
        valueAxis: "ingresoValueAxis",
        title: "Ingresos Medidos",
        lineColor: "#234766",
        color: "#327EB1",
        valueField: "ingresoMdp",
        dashLength: 0,
        bullet: "round",
        balloonText: "[[category]]<br><b><span style='font-size:14px;'>ingreso:[[ingreso]]</span></b>"
      }, {
        valueAxis: "tdpaValueAxis",
        title: "TDPA Medido",
        lineColor: "#ff0000",
        valueField: "aforo",
        dashLength: 0,
        bullet: "round",
        balloonText: "[[category]]<br><b><span style='font-size:14px;'>TDPA:[[aforo]]</span></b>"
      }],

      chartCursor: {
        valueLineEabled: true,
        valueLineBalloonEnabled: true,
        selectWithoutZooming: true
      },

      // zoomControl: {
      //   zoomControlEnabled: false
      // }

    });
  }

  tdpaChart(): void {
    this.AmCharts.makeChart("tdpaChart", {
      type: "pie",
      theme: "light",
      dataProvider: this.tdpaChartData,
      valueField: "aforo",
      titleField: "claseVehicular",
      percentPrecision: 1,
      radius: "30%",
      innerRadius: "50%",
      balloonText: "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
      colors: [
        "#FF0000", "#CC0000", "#FF7F7F", "#FFA5A5"
      ]
    });
  }

  ingresoChart(): void {
    this.AmCharts.makeChart("ingresoChart", {
      type: "pie",
      theme: "light",
      dataProvider: this.ingresoChartData,
      valueField: "ingreso",
      titleField: "tipoAuto",
      percentPrecision: 1,
      radius: "30%",
      innerRadius: "50%",
      balloonText: "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
      colors: [
        "#3B8BB6", "#0B6FA4", "#9DC5DA", "#BAD6E5"
      ]
    });
  }

  efectivoTelepeajeChart(): void {
    this.AmCharts.makeChart("efectivoTelepeajeChart", {
      type: "pie",
      theme: "light",
      dataProvider: this.telepeajeChartData,
      valueField: "ingreso",
      titleField: "formaPago",
      percentPrecision: 1,
      radius: "30%",
      innerRadius: "50%",
      balloonText: "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
      colors: [
        "#3B8BB6", "#0B6FA4", "#9DC5DA", "#BAD6E5"
      ]
    });
  }

  getScreenOrientation() {
    let screen_o = this.screenOrientation.type;
    this.sot = (screen_o && screen_o.includes("portrait")) ? 1 : 0
    console.log(this.screenOrientation.type);
  }

}
