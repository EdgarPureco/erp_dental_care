import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home-d',
  templateUrl: './home-d.component.html',
  styleUrls: ['./home-d.component.scss'],
})
export class HomeDComponent  implements OnInit {

  constructor(private api: ApiService) {
    let fechaActual = new Date();

    fechaActual.setFullYear(fechaActual.getFullYear() - 5);

  
  }

  data: any[] = [];

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.api.getMyAppointments('dentists').then((response:any) => {
      this.data = response.data;
    });
  }

  

}
