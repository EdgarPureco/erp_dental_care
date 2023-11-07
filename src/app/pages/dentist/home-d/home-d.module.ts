import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeDComponent } from './home-d.component';
import { VerticalMenuDentistModule } from 'src/app/components/vertical-menu-dentist/vertical-menu-dentist.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    VerticalMenuDentistModule
  ],
  declarations: [HomeDComponent],
  exports: [HomeDComponent]
})
export class HomeDModule {}
