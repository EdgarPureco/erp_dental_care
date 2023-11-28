import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home-p',
  templateUrl: './home-p.component.html',
  styleUrls: ['./home-p.component.scss'],
})
export class HomePComponent  implements OnInit {

  constructor(private api: ApiService) {
    let fechaActual = new Date();

    fechaActual.setFullYear(fechaActual.getFullYear() - 5);

  
  }

  data: any = null;

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.api.getMyAppointments('patients').then((response:any) => {
      this.data = response.data[0];
    });
  }

  formatDateToLetter(date: any) {
    var startDate = new Date(date);

    const formattedDate = new Intl.DateTimeFormat('es-ES', { hour: 'numeric', minute: 'numeric', weekday: 'long', month: 'long', day: 'numeric' }).format(startDate);

    return formattedDate;
  }

}
