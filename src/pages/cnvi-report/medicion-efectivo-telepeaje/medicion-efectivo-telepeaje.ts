import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the MedicionEfectivoTelepeajePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-medicion-efectivo-telepeaje',
  templateUrl: 'medicion-efectivo-telepeaje.html',
})
export class MedicionEfectivoTelepeajePage {
  public pagoEfectivoTelepeaje: any[] = [];
  private proyecto: '';
  private periodo: any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController) {
      let data = navParams.get("data");

    if (data && data.formasPagoEfectivoTelepeaje) {
      this.pagoEfectivoTelepeaje = data.formasPagoEfectivoTelepeaje;     
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
