import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/debounceTime';

// import * as $ from "jquery";
// import * as ldBar from "jquery";


/**
 * Generated class for the EficienciaCobradorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-eficiencia-cobrador',
  templateUrl: 'eficiencia-cobrador.html',
})
export class EficienciaCobradorPage {
  private cobradores: any[] = [];
  private items: any[] = [];
  private proyecto: '';
  private periodo: any;

  searchTerm: string = '';
  searchControl: FormControl;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
    let data = navParams.get("data");
    if (data && data.eficienciaCobradores) {
      this.proyecto = data.proyecto;
      this.periodo = {
        fechaInicio: data.fechaInicio,
        fechaFin: data.fechaFin
      };
      this.cobradores = this.items = data.eficienciaCobradores;
      //this.items = data.eficienciaCobradores;
      //this.items= Object.assign({}, data.eficienciaCobradores);
    }
  }


  ionViewDidLoad() {
    //this.items = this.cobradores
    this.viewCtrl.setBackButtonText('Reporte CNVI');
  }

  setFilteredItems() {

    this.items = (this.searchTerm && this.searchTerm.length > 1) ? this.cobradores.filter((item) => {
      return item.nombreUsuario.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1;
    }) : this.cobradores;

    console.log(this.items)
  }

  onCancel(event) {

  }
}
