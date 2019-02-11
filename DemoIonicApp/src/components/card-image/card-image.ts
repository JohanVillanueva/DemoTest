import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { Item } from './../../models/Item';

/**
 * Generated class for the CardImageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'card-image',
  templateUrl: 'card-image.html'
})
export class CardImageComponent {


  @Input('data') data:Item;
  @Output('onFavEvent') onFavEvent = new EventEmitter();
  @Output('onDeleteEvent') onDeleteEvent = new EventEmitter();
  @Output('onEditEvent') onEditEvent = new EventEmitter();
  @Output('onDetailEvent') onDetailEvent = new EventEmitter();
  constructor(private popoverCtrl:PopoverController) {
  }

  onFav() {
    this.data.isFav=!this.data.isFav;
    this.onFavEvent.emit(this.data.id);
  }
  
  openDetail() {
    this.onDetailEvent.emit(this.data);
  }
  
  openPopover(event) {
    const popover = this.popoverCtrl.create('PopoverPage');
    popover.onDidDismiss(optionName=>{
      if (optionName==='delete') {
        this.onDeleteEvent.emit(this.data.id);
      }
      else if (optionName==='edit')  this.onEditEvent.emit(this.data);
    })
    popover.present({
      ev:event
    });
  }
}
