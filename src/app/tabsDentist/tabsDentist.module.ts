import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsDentistPageRoutingModule } from './tabsDentist-routing.module';

import { TabsDentistPage } from './tabsDentist.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsDentistPageRoutingModule
  ],
  declarations: [TabsDentistPage],
  exports:[TabsDentistPage]
})
export class TabsDentistPageModule {}
