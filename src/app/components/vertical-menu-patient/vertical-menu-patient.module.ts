import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { VerticalMenuPatientComponent } from './vertical-menu-patient.component';



@NgModule({
  declarations: [VerticalMenuPatientComponent],
  exports: [VerticalMenuPatientComponent],
  imports: [
    IonicModule,
    CommonModule,
  ]
})
export class VerticalMenuPatientModule { }
