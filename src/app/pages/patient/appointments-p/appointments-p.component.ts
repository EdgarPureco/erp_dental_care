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
    this.api.getPatientAppointments().then((response:any) => {
      this.data = response.data;
    });
  }

  onWillDismiss() {
    this.modalDetails = false
  }


  openDetails(id: any) {

    this.modalDetails = true

    this.api.getAppointment(id).then((response:any) => {
      this.appointment = response.data;
    })
  }



  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Éxito !!',
      duration: 1500,
      position: 'top',
      color: 'success'
    });

    await toast.present();
  }

  // Secondary Functions

  formatDateToLetter(date: any) {
    var startDate = new Date(date);

    const formattedDate = new Intl.DateTimeFormat('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}).format(startDate);

    return formattedDate;
  }
}
