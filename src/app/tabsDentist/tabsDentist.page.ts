import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-tabsDentist',
  templateUrl: 'tabsDentist.page.html',
  styleUrls: ['tabsDentist.page.scss']
})
export class TabsDentistPage {

  constructor(private api: ApiService) {}

  logout(){
    this.api.logout()
  }

}
