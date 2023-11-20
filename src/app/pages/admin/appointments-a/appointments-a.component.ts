import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CheckboxCustomEvent } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-appointments-a',
  templateUrl: './appointments-a.component.html',
  styleUrls: ['./appointments-a.component.scss'],
})
export class AppointmentsAComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private api: ApiService) {
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
    this.api.getAppointments().then((response: any) => {
      this.data = response.data;
    });
    this.api.getPatients().then((response: any) => {
      this.dentists = response.data;
    });
    this.api.getDentists().then((response: any) => {
      this.patients = response.data;
    });
  }

  openAdd() {
    this.modalAdd = true
  }

  onSubmit() {

    this.api.insertAppointment(this.appointmentForm.value).then(
      (response: any) => {
        this.modalAdd = false
        console.log(response.data);
        this.appointmentForm.reset();
        this.getData()
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
        console.log("HALO", e);
      }
    );
    this.appointmentEditForm.reset();
  }

  openDetails(id: any) {

    this.modalDetails = true

    this.api.getAppointment(id).then((response: any) => {
      this.appointment = response.data;
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
    this.api.getServices().then((response: any) => {
      this.services = response.data
    })
    this.api.getSupplies().then((response: any) => {
      this.supplies = response.data
    })
  }

  handleChangeSupplies(e: any) {
    this.suppliesAdded.push(
      {
        "supply_id": parseInt(e.detail.value),
        "quantity": 1,
        "name": this.supplies[this.findIndexByIdSupplies(e.detail.value)].name
      });
  }

  handleChangeServices(e: any) {
    this.servicesAdded.push(
      {
        "service_id": parseInt(e.detail.value),
        "quantity": 1,
        "name": this.services[this.findIndexByIdServices(e.detail.value)].name
      });
  }

  finishAppointment() {
    this.api.finishAppointment(this.appointment.id).then(
      (response: any) => {
        this.modalFinish = false
        this.getData();
      }
    )
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



  // Secondary Functions

  formatDateToLetter(date: any) {
    var startDate = new Date(date);

    const formattedDate = new Intl.DateTimeFormat('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}).format(startDate);

    return formattedDate;
  }

}
