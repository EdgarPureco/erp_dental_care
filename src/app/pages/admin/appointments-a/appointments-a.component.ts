import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CheckboxCustomEvent, ToastController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-appointments-a',
  templateUrl: './appointments-a.component.html',
  styleUrls: ['./appointments-a.component.scss'],
})
export class AppointmentsAComponent implements OnInit {

  constructor(private toastController: ToastController, private formBuilder: FormBuilder, private api: ApiService) {
    let fechaActual = new Date();

    fechaActual.setFullYear(fechaActual.getFullYear() - 5);


  }

  data: any[] = [];
  results: any[] = [];
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

  modalAdd = false
  modalDetails = false
  modalEdit = false
  modalFinish = false
  modalDelete = false
  maxPL = 6

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.api.getAppointments('all').then((response: any) => {
      this.data = response.data;
      this.results = [...this.data]
    });
    this.api.getPatients('all').then((response: any) => {
      this.dentists = response.data;
    });
    this.api.getDentists('all').then((response: any) => {
      this.patients = response.data;
    });
  }

  openAdd() {
    this.modalAdd = true
  }

  onSubmit() {

    this.api.insertAppointment(this.appointmentForm.value).then(
      (response: any) => {
        console.log(response.data);
        this.presentToast()
        this.appointmentForm.reset();
        this.getData()
        this.modalAdd = false
      },
      (e: any) => {
        console.log("HALO", e);
      }
    );
  }

  onWillDismiss() {
    this.modalAdd = false
    this.modalDetails = false
    this.modalEdit = false
    this.modalFinish = false
    this.modalDelete = false
  }


  onSubmitEdit() {
    this.api.updateAppointment(this.appointment.id, this.appointmentEditForm.value).then(
      (response: any) => { this.modalEdit = false, this.getData() },
      (e: any) => {
        this.presentToast()
        console.log("HALO", e);
      }
    );
    this.appointmentEditForm.reset();
  }

  openDetails(id: any) {

    this.modalDetails = true

    this.api.getAppointment(id).then((response: any) => {
      this.appointment = response.data;
      console.log(response.data);
    })
  }

  openEdit(id: any) {
    this.modalEdit = true
    this.api.getAppointment(id).then((response: any) => {
      this.appointment = response.data,
        console.log(this.appointment);

    })

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

  openFinish(id: any) {
    this.modalFinish = true
    this.api.getAppointment(id).then((response: any) => {
      this.appointment = response.data
    })
    this.api.getServices('all').then((response: any) => {
      this.services = response.data
    })
    this.api.getSupplies('all').then((response: any) => {
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

  openDelete(id: any) {
    this.modalDelete = true
    this.api.getAppointment(id).then((response: any) => {
      this.appointment = response.data
    })
  }


  deleteAppointment() {
    this.api.deleteAppointment(this.appointment.id).then(
      (response: any) => {
        this.modalDelete = false
        this.getData();
      }
    )
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

  search(event:any) {
    const query = event.target.value.toLowerCase();
    console.log(this.results);
    
    if (query==='' || query===null) {
      this.results = [...this.data]
    }else{
      this.results = this.data.filter((d) => {
        const patient = d.patient.person;
        const dentist = d.dentist.person;
        const fullName = `${patient.name} ${patient.lastname} ${dentist.surname} ${dentist.name} ${dentist.lastname} ${dentist.surname}`.toLowerCase();
        return fullName.includes(query.toLowerCase());
      });
    }
  }

  filter($e:any){
    this.api.getAppointments($e.detail.value).then((response: any) => {
      this.data = response.data;
      this.results = [...this.data]
      
    });
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
