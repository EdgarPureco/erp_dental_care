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

  data: any = null;
  loading: boolean = false;

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true
    this.api.getMyAppointments('dentists').then((response:any) => {
      if(response.data[0].status==='AGENDADA'){
        this.data = response.data[0];
      }
      this.loading = false
    });
  }

  formatDateToLetter(date: any) {
    var startDate = new Date(date);

    const formattedDate = new Intl.DateTimeFormat('es-ES', { hour: 'numeric', minute: 'numeric', weekday: 'short', month: 'long', day: 'numeric' }).format(startDate);

    return formattedDate;
  }

}
