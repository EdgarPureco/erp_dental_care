import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-account-p',
  templateUrl: './account-p.component.html',
  styleUrls: ['./account-p.component.scss'],
})
export class AccountPComponent  implements OnInit {

  constructor(private formBuilder: FormBuilder, private api: ApiService) {
    let fechaActual = new Date();

    fechaActual.setFullYear(fechaActual.getFullYear() - 5);

    this.maxDateBirth = fechaActual;
  }

  ngOnInit() {
    this.getData();
  }

  maxDateBirth: Date;
  data: any = null
  modalEdit = false

  dataEditForm = this.formBuilder.group({
    name: null,
    surname: null,
    lastname: null,
    birthday: null,
    sex: null,
    address: null,
    cp: null,
    phone: null,
    email: null,
    
  });

  getData() {
    this.api.getMyInfo('patients').then((response:any) => {
      this.data = response.data;console.log( "HALO",response.data)
    });
  }

  openEdit() {
    this.modalEdit = true
  }

  onSubmitEdit() {
    this.api.updateDentist(this.data.id, this.dataEditForm.value).then(
      (response:any) => { this.modalEdit = false }, (e:any) => console.log(e.data)
      
    );
    this.dataEditForm.reset();
  }

 
  onWillDismiss() {
    this.modalEdit = false
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
