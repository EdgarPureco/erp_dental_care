import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsDentistPage } from './tabsDentist.page';
import { HomePComponent } from '../pages/patient/home-p/home-p.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsDentistPage,
    children: [
      {
        path: 'tab1',
        component: HomePComponent
      },
      {
        path: 'tab2',
        component: HomePComponent
      },
      {
        path: 'tab3',
        component: HomePComponent
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full'
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsDentistPageRoutingModule {}
