import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the KpiExcelPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-kpi-excel',
  templateUrl: 'kpi-excel.html',
})
export class KpiExcelPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KpiExcelPage');
  }

  downloadXlsx() {
    console.log('downloadXlsx');
  }
}
