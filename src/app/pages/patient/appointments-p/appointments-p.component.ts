import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CheckboxCustomEvent, ToastController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-appointments-p',
  templateUrl: './appointments-p.component.html',
  styleUrls: ['./appointments-p.component.scss'],
})
export class AppointmentsPComponent implements OnInit {

  constructor(private toastController: ToastController, private formBuilder: FormBuilder, private api: ApiService) {
    let fechaActual = new Date();

    fechaActual.setFullYear(fechaActual.getFullYear() - 5);

  
  }

  data: any[] = [];
  loading: boolean = false;
  results: any[] = [];
  patients: any[] = [];
  dentists: any[] = [];
  suppliesAdded: any[] = [];
  appointment: any = null



  modalDetails = false
  maxPL = 6

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true
    this.api.getPatientAppointments().then((response:any) => {
      this.data = response.data;
      this.results = [...this.data]
      this.loading = false
      
    });
  }

  onWillDismiss() {
    this.loading = false
    this.modalDetails = false
  }


  openDetails(id: any) {

    this.modalDetails = true

    this.api.getAppointment(id).then((response:any) => {
      this.appointment = response.data;
    })
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

  search(event:any) {
    const query = event.target.value.toLowerCase();
    
    if (query==='' || query===null) {
      this.results = [...this.data]
    }else{
      this.results = this.data.filter((d) => {
        const person = d.person;
        const fullName = `${person.name} ${person.lastname} ${person.surname}`.toLowerCase();
        return fullName.includes(query.toLowerCase());
      });
    }
  }

  // Secondary Functions

  formatDateToLetter(date: any) {
    var startDate = new Date(date);

    const formattedDate = new Intl.DateTimeFormat('es-ES', { hour: 'numeric', minute: 'numeric', weekday: 'short', month: 'long', day: 'numeric'}).format(startDate);

    return formattedDate;
  }
}
