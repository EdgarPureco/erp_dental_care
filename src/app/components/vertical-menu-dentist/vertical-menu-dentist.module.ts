import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { VerticalMenuDentistComponent } from './vertical-menu-dentist.component';



@NgModule({
  declarations: [VerticalMenuDentistComponent],
  exports: [VerticalMenuDentistComponent],
  imports: [
    IonicModule,
    CommonModule,
  ]
})
export class VerticalMenuDentistModule { }
