import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-vertical-menu-dentist',
  templateUrl: './vertical-menu-dentist.component.html',
  styleUrls: ['./vertical-menu-dentist.component.scss'],
})
export class VerticalMenuDentistComponent {

  constructor(private api: ApiService) { }

  logout(){
    this.api.logout()
  }

}
