import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AmChartsService } from '@amcharts/amcharts3-angular';

/**
 * Generated class for the AforoAnormalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-aforo-anormal',
  templateUrl: 'aforo-anormal.html',
})
export class AforoAnormalPage {
  public chartData: any[] = [];
  public aforoAnormal: any;
  private proyecto: '';
  private periodo: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private AmCharts: AmChartsService,
    public viewCtrl: ViewController) {
    let data = navParams.get("data");
    
    console.log(data);
    if (data && data.aforoAnormal) {
      this.aforoAnormal = data.aforoAnormal;
      this.proyecto = data.proyecto;
      this.periodo = {
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin
      };
      this.chartData.push({
        eficiencia: this.aforoAnormal.totalAnormalesPorcentaje,
        flag: 'anormal'
      })
      this.chartData.push({
        eficiencia: this.aforoAnormal.eficiencia,
        flag: 'normal'
      });
    }
  }

  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('Reporte CNVI');
    if(this.chartData && this.chartData.length > 0)
    {
      this.aforoAnormalChart();
    }
  }

  aforoAnormalChart(): void {
    let formato = {
      style: "percent",
      minimumFractionDigits: 2,
      minimumIntegerDigits: 2
    };

    let eficiencia = (this.chartData) ? this.chartData[1].eficiencia : 0;
    eficiencia = (eficiencia) ? eficiencia.toLocaleString('es-MX', formato) : 0;

    this.AmCharts.makeChart("aforoAnormalChart", {
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
        text: (eficiencia) ? eficiencia : 0,
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
