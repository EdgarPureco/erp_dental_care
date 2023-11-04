import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CheckboxCustomEvent } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-patients-a',
  templateUrl: './patients-a.component.html',
  styleUrls: ['./patients-a.component.scss'],
})
export class PatientsAComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private api: ApiService) {
    let fechaActual = new Date();

    fechaActual.setFullYear(fechaActual.getFullYear() - 5);

    this.maxDate = fechaActual;
  }

  data: any[] = [];
  patient: any = null
  maxDate: Date;

  patientForm = this.formBuilder.group({
    name: null,
    surname: null,
    lastname: null,
    birthday: null,
    sex: null,
    address: null,
    cp: null,
    phone: null,
    email: null,
    password: null
  });

  patientEditForm = this.formBuilder.group({
    name: null,
    surname: null,
    lastname: null,
    birthday: null,
    sex: null,
    address: null,
    cp: null,
    phone: null,
    email: null
  });

  modalAdd = false
  modalDetails = false
  modalEdit = false
  modalDelete = false

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.api.getPatients().then((response:any) => { this.data = response.data, console.log(response);
     });
  }

  openAdd(){
    this.modalAdd = true
  }
  onSubmit() {
    this.api.insertPatient(this.patientForm.value).then(
      (response:any) => {this.modalAdd = false
      this.patientForm.reset();
      this.getData()}
    );
  }

  onWillDismiss(){
    this.modalAdd = false
    this.modalDetails = false
    this.modalEdit = false
    this.modalDelete = false
  }
  
  onSubmitEdit() {
    this.api.updatePatient(this.patient.id, this.patientEditForm.value).then(
      (response:any) => {
        this.patient = null
        this.modalEdit = false
        this.getData();
      }
    );
    this.patientEditForm.reset();
  }

  openDetails(id: any) {

    this.modalDetails = true

    this.api.getPatient(id).then((response:any) => {
      this.patient = response.data;
    })
  }

  openEdit(id: any) {
    this.modalEdit = true
    this.api.getPatient(id).then((response:any) => {
      this.patient = response.data
    })
    if(this.patient!==null){
      this.patientEditForm.value.name = this.patient.name
      this.patientEditForm.value.surname = this.patient.surname
      this.patientEditForm.value.lastname = this.patient.lastname
      this.patientEditForm.value.birthday = this.patient.birthday
      this.patientEditForm.value.sex = this.patient.sex
      this.patientEditForm.value.address = this.patient.address
      this.patientEditForm.value.cp = this.patient.cp
      this.patientEditForm.value.phone = this.patient.phone
      this.patientEditForm.value.email = this.patient.email
    }
  }

  openDelete(id: any) {
    this.modalDelete = true
    this.api.getPatient(id).then((response:any) => {
      this.patient = response.data
    })
  }



  deletePatient() {
    this.api.deletePatient(this.patient.id).then(
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
