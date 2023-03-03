import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the IngresoLiquidadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ingreso-liquidado',
  templateUrl: 'ingreso-liquidado.html',
})
export class IngresoLiquidadoPage {
  public ingresosLiquidados: any[] = [];
  private proyecto: '';
  private periodo: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController) {
      let data = navParams.get("data");

    if (data && data.ingresosLiquidados) {
      this.ingresosLiquidados = data.ingresosLiquidados;   
      this.proyecto = data.proyecto;   
      this.periodo = {
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin
      };  
    }
  }
  ionViewDidLoad() {
    this.viewCtrl.setBackButtonText('Reporte CNVI');
  }

}
