import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeAComponent } from './pages/admin/home-a/home-a.component';
import { TabsPage } from './tabs/tabs.page';
import { HomeDComponent } from './pages/dentist/home-d/home-d.component';
import { HomePComponent } from './pages/patient/home-p/home-p.component';
import { LoginComponent } from './pages/login/login.component';
import './importModules';
import { TabsPatientPage } from './tabsPatient/tabsPatient.page';
import { PatientsAComponent } from './pages/admin/patients-a/patients-a.component';
import { DentistsAComponent } from './pages/admin/dentists-a/dentists-a.component';
import { SuppliesAComponent } from './pages/admin/supplies-a/supplies-a.component';
import { ServicesAComponent } from './pages/admin/services-a/services-a.component';
import { Roles } from './models/roles';
import { AuthGuard } from './guards/auth.guard';
import { AppointmentsAComponent } from './pages/admin/appointments-a/appointments-a.component';

const routes: Routes = [
  {
    path: 'pages',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'admin',
        component: TabsPage,
        children: [
          {
            path: 'home',
            component: HomeAComponent,
            canActivate: [AuthGuard],
            data: { roles: [Roles.Admin] }
          },
          {
            path: 'patients',
            component: PatientsAComponent,
            canActivate: [AuthGuard],
            data: { roles: [Roles.Admin] }
          },
          {
            path: 'dentists',
            component: DentistsAComponent,
            canActivate: [AuthGuard],
            data: { roles: [Roles.Admin] }
          },
          {
            path: 'supplies',
            component: SuppliesAComponent,
            canActivate: [AuthGuard],
            data: { roles: [Roles.Admin] }
          },
          {
            path: 'services',
            component: ServicesAComponent,
            canActivate: [AuthGuard],
            data: { roles: [Roles.Admin] }
          },
          {
            path: 'appointments',
            component: AppointmentsAComponent,
            canActivate: [AuthGuard],
            data: { roles: [Roles.Admin] }
          },
        ]
      },
      {
        path: 'dentist',
        component: TabsPage,
        children: [
          {
            path: 'home',
            component: HomeDComponent,
            canActivate: [AuthGuard],
            data: { roles: [Roles.Dentist] }
          },
        ]
      },
      {
        path: 'patient',
        component: TabsPatientPage,
        children: [
          {
            path: 'home',
            component: HomePComponent
          },
        ]
      },
    ]
  },

  {
    path: '',
    redirectTo: 'pages/login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
