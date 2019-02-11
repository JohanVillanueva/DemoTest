import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  options: Array<{name: string, value: any, icon:string}>;
  constructor(private viewCtrl:ViewController) {
    this.options = [
      { name:'Edit', value:'edit', icon:'create'},
      { name:'Eliminar', value:'delete', icon:'trash'},
    ]
  }

  closePopover(option:string){
    this.viewCtrl.dismiss(option);
  }
}
