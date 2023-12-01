import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home-p',
  templateUrl: './home-p.component.html',
  styleUrls: ['./home-p.component.scss'],
})
export class HomePComponent  implements OnInit {

  constructor(private toastController: ToastController,private api: ApiService) {
    let fechaActual = new Date();

    fechaActual.setFullYear(fechaActual.getFullYear() - 5);

  
  }

  data: any = null;
  loading: boolean = false;

  ngOnInit() {
    this.getData();
  }

  async getData() {
    this.loading = true
    await this.api.getMyAppointments('patients').then((response:any) => {
      if(response.data[0].status==='AGENDADA'){
        this.data = response.data[0];
      }
      this.loading = false
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    });
  }

  formatDateToLetter(date: any) {
    var startDate = new Date(date);

    const formattedDate = new Intl.DateTimeFormat('es-ES', { hour: 'numeric', minute: 'numeric', weekday: 'short', month: 'long', day: 'numeric' }).format(startDate);

    return formattedDate;
  }

  async presentToast(message:string, type:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
      color: type
    });
  
    await toast.present();
  }

}
