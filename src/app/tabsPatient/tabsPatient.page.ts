import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tabsPatient',
  templateUrl: 'tabsPatient.page.html',
  styleUrls: ['tabsPatient.page.scss']
})
export class TabsPatientPage {

  constructor(private api: ApiService) {}

  logout(){
    this.api.logout()
  }

}
