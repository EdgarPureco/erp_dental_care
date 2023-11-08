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
  suppliesAdded: any[] = [];
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
  modalDelete = false
  maxPL = 6

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.api.getAppointments().then((response:any) => {
      this.data = response.data;
    });
    this.api.getPatients().then((response:any) => {
      this.dentists = response.data;
    });
    this.api.getDentists().then((response:any) => {
      this.patients = response.data;
    });
  }

  openAdd() {
    this.modalAdd = true
  }

  onSubmit() {

    this.api.insertAppointment(this.appointmentForm.value).then(
      (response:any) => {
        this.modalAdd = false
        console.log(response.data);
        this.appointmentForm.reset();
        this.getData()
      },
      (e:any)=>{console.log("HALO", e);
      }
    );
  }

  onWillDismiss() {
    this.modalAdd = false
    this.modalDetails = false
    this.modalEdit = false
    this.modalDelete = false
  }

  handleChange(e: any) {
  }

  onSubmitEdit() {
    this.api.updateAppointment(this.appointment.id, this.appointmentEditForm.value).then(
      (response:any) => { this.modalEdit = false, this.getData() },
      (e:any)=>{console.log("HALO", e);
      }
    );
    this.appointmentEditForm.reset();
  }

  openDetails(id: any) {

    this.modalDetails = true

    this.api.getAppointment(id).then((response:any) => {
      this.appointment = response.data;
    })
  }

  openEdit(id: any) {
    this.modalEdit = true
    this.api.getAppointment(id).then((response:any) => {
      this.appointment = response.data
    })

  }

  openDelete(id: any) {
    this.modalDelete = true
    this.api.getAppointment(id).then((response:any) => {
      this.appointment = response.data
    })
  }

  editAppointment(id: any) {
    this.api.updateAppointment(id, this.appointmentForm.value).then(
      (response:any) => {
        this.appointment = null
        this.modalEdit = false
        this.getData();
      }
    )
  }

  deleteAppointment() {
    this.api.deleteAppointment(this.appointment.id).then(
      (response:any) => {
        this.modalDelete = false
        this.getData();
      }
    )
  }




  // Secondary Functions

  readonly phoneMask: MaskitoOptions = {
    mask: [/\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
  };

  readonly cardMask: MaskitoOptions = {
    mask: [
      ...Array(3).fill(/\d/),
      ' ',
      ...Array(3).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
    ],
  };

  readonly maskPredicate: MaskitoElementPredicateAsync = async (el) => (el as HTMLIonInputElement).getInputElement();


}
