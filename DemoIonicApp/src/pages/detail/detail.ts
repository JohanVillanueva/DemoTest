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
  imageUrl:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder:FormBuilder,private photoLibrary:PhotoLibrary,
    private itemProvider:ItemProvider,private loadingCtrl:LoadingController, private alertCtrl:AlertController,private camera:Camera) {

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
    let itemToSave:Item = new Item(title,description,this.imageUrl)
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
    let cameraOptions = {
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: Camera.DestinationType.FILE_URI,      
      quality: 100,
      targetWidth: 1000,
      targetHeight: 1000,
      encodingType: Camera.EncodingType.JPEG,      
      correctOrientation: true
    }
  
    this..getPicture(cameraOptions)
      .then(file_uri => alert(file_uri), 
      err => console.log(err));  
  }

  updateData(id){
    let {title,description} = this.form.value;
    
    let itemToSave:Item = new Item(title,description,this.imageUrl);

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
