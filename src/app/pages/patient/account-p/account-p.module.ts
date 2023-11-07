import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountPComponent } from './account-p.component';
import { VerticalMenuPatientModule } from 'src/app/components/vertical-menu-patient/vertical-menu-patient.module';
import { MaskitoModule } from '@maskito/angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    VerticalMenuPatientModule,
    MaskitoModule
  ],
  declarations: [AccountPComponent],
  exports: [AccountPComponent]
})
export class AccountPModule {}
