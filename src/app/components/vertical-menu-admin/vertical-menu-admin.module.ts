import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { VerticalMenuAdminComponent } from './vertical-menu-admin.component';



@NgModule({
  declarations: [VerticalMenuAdminComponent],
  exports: [VerticalMenuAdminComponent],
  imports: [
    IonicModule,
    CommonModule,
  ]
})
export class VerticalMenuAdminModule { }
