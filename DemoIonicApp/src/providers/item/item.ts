import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Item } from './../../models/Item';

const STORAGE_KEY = 'item';
/*
  Generated class for the ImagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemProvider {

  constructor(private storage:Storage) {
  }

  saveItemData(itemData: Item){
    return this.getAllItems().then(result => {
      if (result) {
        result.push(itemData);
        return this.storage.set(STORAGE_KEY, result);
      } else {
        return this.storage.set(STORAGE_KEY, [itemData]);
      }
    });
  }

  editItem(itemId:string, data){
    return this.getAllItems().then((result:Item[]) => {
      if (result) {
        let index = result.findIndex(item=>item.id===itemId);
        if (index!=-1) {
          result[index]={...data,id:itemId};
          this.storage.set(STORAGE_KEY,result);
        }
      } 
    }).catch(err=>err);
  }
  
  deleteItem(itemId: string){
    return this.getAllItems().then((result:Item[]) => {
      if (result) {
        let index = result.findIndex(item=>item.id===itemId);
        if (index!=-1) {
          result.splice(index, 1);
          this.storage.set(STORAGE_KEY,result);
        }
      }
    }).catch(err=>err);
  }

  favoriteItem(itemId){
    return this.getAllItems().then((result:Item[]) => {
      if (result) {
        let index = result.findIndex(item=>item.id===itemId);
        if (index!=-1) {
          result[index].isFav=!result[index].isFav;
        }
        this.storage.set(STORAGE_KEY, result);
      } 
    }).catch(err=>err);
  }
  // isFavorite(itemId){
  //   return this.getAllItems().then(result => {
  //     return result && result.indexOf(itemId) !== -1;
  //   });
  // }
  getAllItems() {
    return this.storage.get(STORAGE_KEY).then(result=>result);
  }
}
