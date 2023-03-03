import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the EficienciaCarrilPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-eficiencia-carril',
  templateUrl: 'eficiencia-carril.html',
})
export class EficienciaCarrilPage { 
  public listaEficienciaSistema: any[] = []; 
  private proyecto: '';
  private periodo: any;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
    ) {
    let data = navParams.get("data");

    if (data && data.eficienciaCarriles) {
      this.listaEficienciaSistema = data.eficienciaCarriles;  
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
