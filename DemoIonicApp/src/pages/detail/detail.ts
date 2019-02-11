import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { PhotoLibrary } from '@ionic-native/photo-library';
import { ItemProvider } from '../../providers/item/item';
import { Item } from './../../models/Item';

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  title:string;
  form:FormGroup;
  loader:Loading;

  data:Item;
  isFormDisabled:boolean;
  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder:FormBuilder,private photoLibrary:PhotoLibrary,
    private itemProvider:ItemProvider,private loadingCtrl:LoadingController, private alertCtrl:AlertController) {

    this.data = this.navParams.get('data');
    this.isFormDisabled = this.navParams.get('disableForm');
    this.title="Demo App";

    if (this.isFormDisabled) {
      this.form = this.formBuilder.group({
        title:new FormControl({value:this.data.title,disabled:true}),
        description:new FormControl({value:this.data.description,disabled:true}),
      })
    }
    else {
      this.form = this.formBuilder.group({
        title:[this.data?this.data.title:'',Validators.required],
        description:[this.data?this.data.description:'']
      })
    }
  }

  saveData(){
    let {title,description} = this.form.value;
    let itemToSave:Item = new Item(title,description,null)
    console.log('itemToSave', itemToSave);

    this.presentLoading('Saving...').then(
      ()=>{
        this.itemProvider.saveItemData(itemToSave)
        .then((result:any)=>{
          if(this.loader) this.loader.dismiss();
          this.presentAlert('Message','Successful operation!',true);
          console.log('result save success', result);
        }).catch((err:any)=>{
          if(this.loader) this.loader.dismiss();
          this.presentAlert('Error',"Operation couldn't be completed");
          console.log('err in save:', err);
        })
      }
    );
  }

  pickPhoto(){
    this.photoLibrary.requestAuthorization().then(() => {
      this.photoLibrary.getLibrary().subscribe({
        next: library => {
          library.forEach(function(libraryItem) {
            console.log(libraryItem.id);          // ID of the photo
            console.log(libraryItem.photoURL);    // Cross-platform access to photo
            console.log(libraryItem.thumbnailURL);// Cross-platform access to thumbnail
            console.log(libraryItem.fileName);
            console.log(libraryItem.width);
            console.log(libraryItem.height);
            console.log(libraryItem.creationDate);
            console.log(libraryItem.latitude);
            console.log(libraryItem.longitude);
            console.log(libraryItem.albumIds);    // array of ids of appropriate AlbumItem, only of includeAlbumsData was used
          });
        },
        error: err => { console.log('could not get photos'); },
        complete: () => { console.log('done getting photos'); }
      });
    })
    .catch(err => this.presentAlert('Message','Permission Denied'));
  }

  updateData(id){
    let {title,description} = this.form.value;
    let itemToSave:Item = new Item(title,description,null)

    this.presentLoading('Saving...').then(
      ()=>{
        this.itemProvider.editItem(id,itemToSave)
        .then((result:any)=>{
          if(this.loader) this.loader.dismiss();
          this.presentAlert('Message','Successful operation!',true);
          console.log('result save success', result);
        }).catch((err:any)=>{
          if(this.loader) this.loader.dismiss();
          this.presentAlert('Error',"Operation couldn't be completed");
          console.log('err in save:', err);
        })
      }
    );
  }
  cancelbuttonClick(){
    this.navCtrl.pop();
  }
  
  async presentLoading(message:string="Loading..."){
    this.loader = await this.loadingCtrl.create({
      content:message,
      showBackdrop:true,
      spinner:'crescent'
    });
    this.loader.present();
  }

  async presentAlert(title:string,subTitle:string,doPopPage:boolean=false){
    let alert = this.alertCtrl.create({
      title,
      subTitle,
      buttons: [
        {
          text: 'Accept',
          role: 'cancel',
          handler: () => {
            alert.dismiss().then(
              ()=>{
                if (doPopPage) {
                  this.navCtrl.pop();  
                }
              }
            );
            return false;
          }
        },
      ]
    });
    alert.present();
  }
}
