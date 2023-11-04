import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPatientPageRoutingModule } from './tabsPatient-routing.module';

import { TabsPatientPage } from './tabsPatient.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TabsPatientPageRoutingModule
  ],
  declarations: [TabsPatientPage],
  exports:[TabsPatientPage]
})
export class TabsPatientPageModule {}
