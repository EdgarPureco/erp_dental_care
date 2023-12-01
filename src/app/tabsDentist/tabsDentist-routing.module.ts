import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsDentistPage } from './tabsDentist.page';
import { HomeDComponent } from '../pages/dentist/home-d/home-d.component';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsDentistPage,
    children: [
      {
        path: 'tab1',
        component: HomeDComponent
      },
      {
        path: 'tab2',
        component: HomeDComponent
      },
      {
        path: 'tab3',
        component: HomeDComponent
      },
      {
        path: 'tab4',
        component: HomeDComponent
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
