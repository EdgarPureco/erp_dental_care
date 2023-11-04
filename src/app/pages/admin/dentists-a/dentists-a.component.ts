import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CheckboxCustomEvent } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-dentists-a',
  templateUrl: './dentists-a.component.html',
  styleUrls: ['./dentists-a.component.scss'],
})
export class DentistsAComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private api: ApiService) {
    let fechaActual = new Date();

    fechaActual.setFullYear(fechaActual.getFullYear() - 5);

    this.maxDateBirth = fechaActual;
  }

  data: any[] = [];
  frequencies: any[] = [];
  dentist: any = null
  maxDateBirth: Date;
  maxDate = new Date();

  dentistForm = this.formBuilder.group({
    name: null,
    surname: null,
    lastname: null,
    birthday: null,
    sex: null,
    address: null,
    cp: null,
    phone: null,

    email: null,
    password: null,

    professional_license: null,
    hired_at: null,
    position: null,
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
    sunday: null,
    start_time: null,
    end_time: null,
    frequency_id: null,
    time: null
  });

  dentistEditForm = this.formBuilder.group({
    name: null,
    surname: null,
    lastname: null,
    birthday: null,
    sex: null,
    address: null,
    cp: null,
    phone: null,

    email: null,

    professional_license: null,
    hired_at: null,
    position: null,
    monday: null,
    tuesday: null,
    wednesday: null,
    thursday: null,
    friday: null,
    saturday: null,
    sunday: null,
    start_time: null,
    end_time: null,
    start_hour: null,
    start_minute: null,
    end_hour: null,
    end_minute: null,
    frequency_id: null,
    frequency: null,
    time: null
  });

  modalAdd = false
  modalDetails = false
  modalEdit = false
  modalDelete = false
  maxPL = 6

  ngOnInit() {
    this.getData();
    this.api.getFrequencies().then((response:any) => { this.frequencies = response.data });
  }

  getData() {
    this.api.getDentists().then((response:any) => { this.data = response.data });
  }

  openAdd() {
    this.modalAdd = true
  }

  onSubmit() {
 
    this.api.insertDentist(this.dentistForm.value).then(
      (response:any) => {
        this.modalAdd = false
        this.dentistForm.reset();
        this.getData()
      }
    );
  }

  onWillDismiss() {
    this.modalAdd = false
    this.modalDetails = false
    this.modalEdit = false
    this.modalDelete = false
  }

  onSubmitEdit() {
    this.api.updateDentist(this.dentist.id, this.dentistForm.value).then(
      (response:any) => { this.modalEdit = false }
    );
    this.dentistEditForm.reset();
  }

  openDetails(id: any) {

    this.modalDetails = true

    this.api.getDentist(id).then((response:any) => {
      this.dentist = response.data;
    })
  }

  openEdit(id: any) {
    this.modalEdit = true
    this.api.getDentist(id).then((response:any) => {
      this.dentist = response.data
      this.dentistEditForm.value.sex = this.dentist.person.sex
    })
    
  }

  openDelete(id: any) {
    this.modalDelete = true
    this.api.getDentist(id).then((response:any) => {
      this.dentist = response.data
    })
  }

  editDentist(id: any) {
    this.api.updateDentist(id, this.dentistForm.value).then(
      (response:any) => {
        this.dentist = null
        this.modalEdit = false
        this.getData();
      }
    )
  }

  deleteDentist() {
    this.api.deleteDentist(this.dentist.id).then(
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
