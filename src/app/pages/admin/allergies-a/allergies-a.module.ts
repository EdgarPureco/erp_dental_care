import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AllergiesAComponent } from './allergies-a.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaskitoModule } from '@maskito/angular';
import { VerticalMenuAdminModule } from 'src/app/components/vertical-menu-admin/vertical-menu-admin.module';



@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    MaskitoModule,
    VerticalMenuAdminModule
  ],
  declarations: [AllergiesAComponent],
  exports: [AllergiesAComponent]
})
export class AllergiesAModule {}