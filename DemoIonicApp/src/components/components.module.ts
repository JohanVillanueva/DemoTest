import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { CardImageComponent } from './card-image/card-image';
@NgModule({
	declarations: [
		CardImageComponent
	],
	imports: [
		IonicModule
	],
	exports: [CardImageComponent]
})
export class ComponentsModule {}
