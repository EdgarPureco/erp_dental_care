import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AppointmentsDComponent } from './appointments-d.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaskitoModule } from '@maskito/angular';
import { VerticalMenuDentistModule } from 'src/app/components/vertical-menu-dentist/vertical-menu-dentist.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    MaskitoModule,
    VerticalMenuDentistModule
  ],
  declarations: [AppointmentsDComponent],
  exports: [AppointmentsDComponent]
})
export class AppointmentsDModule {}
