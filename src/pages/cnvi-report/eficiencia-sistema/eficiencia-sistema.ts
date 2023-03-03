import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AmChartsService } from '@amcharts/amcharts3-angular';

/**
 * Generated class for the EficienciaSistemaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-eficiencia-sistema',
  templateUrl: 'eficiencia-sistema.html',
})
export class EficienciaSistemaPage {
  public listaEficienciaSistema: any[] = [];
  public chartData: any[] = [];
  public eventAnormal: any;
  private proyecto: '';
  private periodo: any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private AmCharts: AmChartsService,
    public viewCtrl: ViewController
    ) {
    let data = navParams.get("data");
    console.log("inicio 1 " + data.fechaInicio);
    console.log("Fin 2 " + data.fechaFin);

    if (data && data.eficienciaCarriles) {
      this.listaEficienciaSistema = data.eficienciaCarriles;
      this.proyecto = data.proyecto;
      this.periodo = {
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin
      };
      this.eventAnormal = { eventosAnormales: 0, totalCarriles: 0, totalEficienciaPorcentaje: 0 };

      for (let item of this.listaEficienciaSistema) {
        this.eventAnormal.eventosAnormales += item.carril;
        this.eventAnormal.totalCarriles += item.total;
      }

      if (this.eventAnormal.totalCarriles > 0) {
        this.eventAnormal.totalEficienciaPorcentaje = this.eventAnormal.eventosAnormales / this.eventAnormal.totalCarriles;
      }

      this.chartData.push({
        eficiencia: 0.30,
        flag: 'anormal'
      })
      this.chartData.push({
        eficiencia: 99.70,
        flag: 'normal'
      });
    }
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('Reporte CNVI');
    this.eficienciaSistemaChart();
  }
 
  eficienciaSistemaChart() {
    const eficiencia = (this.chartData) ? this.chartData[1].eficiencia : 0;
    this.AmCharts.makeChart("eficienciaSistemaChart", {
      type: "pie",
      theme: "light",
      dataProvider: this.chartData,
      valueField: "eficiencia",
      titleField: "flag",
      percentPrecision: 1,
      radius: "0%",
      innerRadius: "90%",
      labelsEnabled: false,
      pullOutRadius: 0,
      startDuration: 0,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
      autoMargins: false,
      allLabels: [{
        y: "40%",
        align: "center",
        size: 20,
        bold: true,
        text: eficiencia + '%',
        color: "#32db64"
      }, {
        y: "57%",
        align: "center",
        size: 13,
        bold: true,
        text: 'Eficiencia',
        color: "#518AFF"
      }],
      balloonText: "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
      colors: [
        "#efefef", "#006699"
      ]
    });
  }
   
}
