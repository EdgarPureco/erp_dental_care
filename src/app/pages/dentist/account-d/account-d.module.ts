import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountDComponent } from './account-d.component';
import { VerticalMenuDentistModule } from 'src/app/components/vertical-menu-dentist/vertical-menu-dentist.module';
import { MaskitoModule } from '@maskito/angular';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    ReactiveFormsModule,
    VerticalMenuDentistModule,
    MaskitoModule
  ],
  declarations: [AccountDComponent],
  exports: [AccountDComponent]
})
export class AccountPModule {}
