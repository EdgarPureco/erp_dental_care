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
import { AccountPComponent } from './pages/patient/account-p/account-p.component';
import { AppointmentsDComponent } from './pages/dentist/appointments-d/appointments-d.component';
import { AppointmentsPComponent } from './pages/patient/appointments-p/appointments-p.component';
import { ServicesPComponent } from './pages/patient/services-p/services-p.component';
import { InventoryAComponent } from './pages/admin/inventory-a/inventory-a.component';
import { TabsDentistPage } from './tabsDentist/tabsDentist.page';
import { AllergiesAComponent } from './pages/admin/allergies-a/allergies-a.component';

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
            path: 'allergies',
            component: AllergiesAComponent,
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
          {
            path: 'inventory',
            component: InventoryAComponent,
            canActivate: [AuthGuard],
            data: { roles: [Roles.Admin] }
          },
        ]
      },
      {
        path: 'dentist',
        component: TabsDentistPage,
        children: [
          {
            path: 'home',
            component: HomeDComponent,
            canActivate: [AuthGuard],
            data: { roles: [Roles.Dentist] }
          },
          {
            path: 'account',
            component: HomeDComponent,
            canActivate: [AuthGuard],
            data: { roles: [Roles.Dentist] }
          },
          {
            path: 'appointments',
            component: AppointmentsDComponent,
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
            component: HomePComponent,
            canActivate: [AuthGuard],
            data: { roles: [Roles.Patient] }
          },
          {
            path: 'account',
            component: AccountPComponent,
            canActivate: [AuthGuard],
            data: { roles: [Roles.Patient] }
          },
          {
            path: 'appointments',
            component: AppointmentsPComponent,
            canActivate: [AuthGuard],
            data: { roles: [Roles.Patient] }
          },
          {
            path: 'services',
            component: ServicesPComponent,
            canActivate: [AuthGuard],
            data: { roles: [Roles.Patient] }
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
