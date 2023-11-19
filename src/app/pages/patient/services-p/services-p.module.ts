import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ServicesPComponent } from './services-p.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaskitoModule } from '@maskito/angular';
import { VerticalMenuPatientModule } from 'src/app/components/vertical-menu-patient/vertical-menu-patient.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    MaskitoModule,
    VerticalMenuPatientModule
  ],
  declarations: [ServicesPComponent],
  exports: [ServicesPComponent]
})
export class ServicesPModule {}
