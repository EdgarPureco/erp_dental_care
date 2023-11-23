import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CheckboxCustomEvent, ToastController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-appointments-d',
  templateUrl: './appointments-d.component.html',
  styleUrls: ['./appointments-d.component.scss'],
})
export class AppointmentsDComponent implements OnInit {

  
  constructor(private toastController: ToastController, private formBuilder: FormBuilder, private api: ApiService) {
    let fechaActual = new Date();

    fechaActual.setFullYear(fechaActual.getFullYear() - 5);


  }

  data: any[] = [];
  patients: any[] = [];
  dentists: any[] = [];
  supplies: any[] = [];
  suppliesAdded: any[] = [];
  services: any[] = [];
  servicesAdded: any[] = [];
  finish: any = null
  appointment: any = null

  appointmentForm = this.formBuilder.group({
    dentist_id: null,
    patient_id: null,
    start_date: null,
    end_date: null,

  });

  appointmentEditForm = this.formBuilder.group({
    dentist_id: null,
    patient_id: null,
    start_date: null,
    end_date: null,
  });


  modalDetails = false
  modalFinish = false
  maxPL = 6

  ngOnInit() {
    this.getData();    
  }

  getData() {
    this.api.getDentistAppointments().then((response: any) => {
      this.data = response.data;
      console.log(response.data);
      
    });
    this.api.getPatients().then((response: any) => {
      this.dentists = response.data;
    });
    this.api.getDentists().then((response: any) => {
      this.patients = response.data;
    });
  }

 
  onWillDismiss() {
    this.modalDetails = false
    this.modalFinish = false
  }


  openDetails(id: any) {

    this.modalDetails = true

    this.api.getAppointment(id).then((response: any) => {
      this.appointment = response.data;
      console.log(response.data);
    })
  }

  openFinish(id: any) {
    this.modalFinish = true
    this.api.getAppointment(id).then((response: any) => {
      this.appointment = response.data
    })
    this.api.getServices().then((response: any) => {
      this.services = response.data
    })
    this.api.getSupplies().then((response: any) => {
      response.data.map((item:any)=>{
        if(item.is_salable){
          this.supplies.push(item)
        }
      })
      console.log(this.supplies);
      
    })
  }

  handleChangeSupplies(e: any) {
    this.suppliesAdded.push(
      {
        "supply_id": parseInt(e.detail.value),
        "quantity": 1
      });
  }

  handleChangeServices(e: any) {
    this.servicesAdded.push(
      {
        "service_id": parseInt(e.detail.value),
        "quantity": 1
      });
  }

  finishAppointment() {
    this.api.finishAppointment(this.appointment.id, this.servicesAdded, this.suppliesAdded).then(
      (response: any) => {
        this.modalFinish = false
        this.getData();
        console.log('HALO response', response.data);
        
      }
    );
  }


  findIndexByIdServices(id: string): number {
    let index = -1;
    for (let i = 0; i < this.services.length; i++) {
      if (this.services[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  serviceExists(id: number): boolean {
    if (this.servicesAdded.some(item => item.service_id === id)) {
      return false
    }
    return true
  }

  findIndexByIdSupplies(id: string): number {
    let index = -1;
    for (let i = 0; i < this.supplies.length; i++) {
      if (this.supplies[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  supplyExists(id: number): boolean {
    if (this.suppliesAdded.some(item => item.supply_id === id)) {
      return false
    }
    return true
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

  
  addQuantitySupplies(e: any, id: number) {
    this.suppliesAdded.map(item => {
      if (item.supply_id === id) {
        item.quantity = parseInt(e.detail.value)
        return item;
      } else {
        return item;
      }
    });
  }

  removeSupply(id: any) {
    this.suppliesAdded = this.suppliesAdded.filter((item) => item.id !== id);
  }

  addQuantityServices(e: any, id: number) {
    this.servicesAdded.map(item => {
      if (item.service_id === id) {
        item.quantity = parseInt(e.detail.value)
        return item;
      } else {
        return item;
      }
    });
  }

  removeService(id: any) {
    this.servicesAdded = this.servicesAdded.filter((item) => item.id !== id);
  }


// Secondary Functions

formatDateToLetter(date: any) {
  var startDate = new Date(date);

  const formattedDate = new Intl.DateTimeFormat('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}).format(startDate);

  return formattedDate;
}

formatDateToNumbers(date: any) {
  var startDate = new Date(date);

  const formattedDate = new Intl.DateTimeFormat('es-ES', { hour: 'numeric', minute: 'numeric', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}).format(startDate);

  return formattedDate;
}

}
