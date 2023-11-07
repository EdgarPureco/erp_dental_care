import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-vertical-menu-admin',
  templateUrl: './vertical-menu-admin.component.html',
  styleUrls: ['./vertical-menu-admin.component.scss'],
})
export class VerticalMenuAdminComponent {

  constructor(private api: ApiService) { }

  logout(){
    this.api.logout()
  }

}