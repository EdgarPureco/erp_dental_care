import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePComponent } from './home-p.component';
import { VerticalMenuPatientModule } from 'src/app/components/vertical-menu-patient/vertical-menu-patient.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    VerticalMenuPatientModule
  ],
  declarations: [HomePComponent],
  exports: [HomePComponent]
})
export class HomePModule {}
