import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, LoadingController, AlertController, Loading, Alert } from 'ionic-angular';
import { Item } from '../../models/Item';
import { ItemProvider } from './../../providers/item/item';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  itemList:Array<Item>;
  loader:Loading;
  alert:Alert;
  constructor(public navCtrl: NavController, public navParams: NavParams, private itemProvider:ItemProvider,
    private loadingCtrl:LoadingController, private alertCtrl:AlertController) {
    this.itemList = [];
  }
  
  ionViewWillEnter(){
    this.loadData();
  }

  loadData(){
    this.itemProvider.getAllItems()
      .then((result:any)=>{
        this.itemList=result;
        console.log('result fav success', result);
      }).catch((err:any)=>{
        this.presentAlert('Error',"Operation couldn't be completed");
        console.log('err in fav:', err);
    });
  }
  openDetail(data, disableForm){
    this.navCtrl.push('DetailPage',{data, disableForm});
  }

  favEvent(id){
    console.log('fav event',);
    this.presentLoading('Loading...').then(
      ()=>{
        this.itemProvider.favoriteItem(id)
        .then((result:any)=>{
          if(this.loader) this.loader.dismiss();
          console.log('result fav success', result);
        }).catch((err:any)=>{
          if(this.loader) this.loader.dismiss();
          this.presentAlert('Error',"Operation couldn't be completed");
          console.log('err in fav:', err);
        })
      }
    );
  }

  unfavEvent(data){
    console.log('unfav event',);
    
  }

  preDeleteEvent(itemId){
    console.log('itemId', itemId)
    let callback = ()=>this.deleteEvent(itemId);
    this.presentAlert('Message','Are you sure to delete this item?',true,callback);
    
  }

  deleteEvent(id):void{
    console.log('id', id)
    this.presentLoading('Deleting...').then(
      ()=>{ 
        this.itemProvider.deleteItem(id)
        .then((result:any)=>{
          if(this.loader) this.loader.dismiss();
          this.loadData();
          console.log('result fav success', result);
        }).catch((err:any)=>{
          if(this.loader) this.loader.dismiss();
          this.presentAlert('Error',"Operation couldn't be completed");
          console.log('err in fav:', err);
        })
      }
    );
  }
  
  editEvent(data){
    console.log('edit event', data);
    this.navCtrl.push('DetailPage',{
      data,
      disableForm:false
    })
  }

  async presentLoading(message:string="Cargando..."){
    this.loader = await this.loadingCtrl.create({
      content:message,
      showBackdrop:true,
      spinner:'crescent'
    });
    this.loader.present();
  }

  async presentAlert(title,subTitle,isConfirm:boolean=false,callback?:Function){
    let alert = this.alertCtrl.create({
      title,
      subTitle,
      buttons: [
        {
          text: isConfirm?'Cancel':'Accept',
          role: 'cancel'
        }
      ]
    });
    if (isConfirm) {
      alert.addButton({
        text: 'Yes',
        handler: () => {
          alert.dismiss(true);
          return false;
        }
      });
      alert.onDidDismiss(isConfirmToDelete=>{
        if (isConfirmToDelete) {
          callback();
        }
      })
    }
    alert.present();
  }
}
