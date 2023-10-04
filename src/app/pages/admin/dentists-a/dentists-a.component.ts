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
    weekdays: null,
    start_hour: null,
    start_minute: null,
    end_hour: null,
    end_minute: null,
    frequency_id: null,
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
    weekdays: null,
    start_hour: null,
    start_minute: null,
    end_hour: null,
    end_minute: null,
    frequency_id: null,
  });

  modalAdd = false
  modalDetails = false
  modalEdit = false
  modalDelete = false

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.api.getDentists().subscribe((response) => { this.data = response });
  }

  openAdd(){
    this.modalAdd = true
  }
  onSubmit() {
    this.api.insertDentist(this.dentistForm.value).subscribe(
      (response) => {this.modalAdd = false
      this.dentistForm.reset();
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
    this.api.updateDentist(this.dentist.id, this.dentistForm.value).subscribe(
      (response) => {this.modalEdit = false}
    );
    this.dentistEditForm.reset();
  }

  openDetails(id: any) {

    this.modalDetails = true

    this.api.getDentist(id).subscribe((response) => {
      this.dentist = response;
    })
  }

  openEdit(id: any) {
    this.modalEdit = true
    this.api.getDentist(id).subscribe((response) => {
      this.dentist = response
    })
    
  }

  openDelete(id: any) {
    this.modalDelete = true
    this.api.getDentist(id).subscribe((response) => {
      this.dentist = response
    })
  }

  editDentist(id: any) {
    this.api.updateDentist(id, this.dentistForm.value).subscribe(
      (response) => {
        this.dentist = null
        this.modalEdit = false
        this.getData();
      }
    )
  }

  deleteDentist() {
    this.api.deleteDentist(this.dentist.id).subscribe(
      (response) => {
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
