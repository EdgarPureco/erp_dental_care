import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-vertical-menu-patient',
  templateUrl: './vertical-menu-patient.component.html',
  styleUrls: ['./vertical-menu-patient.component.scss'],
})
export class VerticalMenuPatientComponent {

  constructor(private api: ApiService) { }

  logout(){
    this.api.logout()
  }

}
