import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-account-p',
  templateUrl: './account-p.component.html',
  styleUrls: ['./account-p.component.scss'],
})
export class AccountPComponent  implements OnInit {

  constructor(private toastController: ToastController, private formBuilder: FormBuilder, private api: ApiService) {
    let fechaActual = new Date();

    fechaActual.setFullYear(fechaActual.getFullYear() - 5);

    this.maxDateBirth = fechaActual;
  }

  ngOnInit() {
    this.getData();
  }

  maxDateBirth: Date;
  data: any = null
  allergies:any[] = []
  allergiesAdded:any[] = []
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
      this.data = response.data; this.allergies=response.data.allergies;console.log( "HALO",this.data.person.name)
    });
  }

  openEdit() {
    this.modalEdit = true
    this.api.getAllergies().then((response:any) => {
      this.allergies=response.data
    });
  }

  onSubmitEdit() {
    console.log(this.allergiesAdded);
    
    // this.api.updateDentist(this.data.id, this.dataEditForm.value).then(
    //   (response:any) => { 
      // this.modalEdit = false 
      // this.presentToast()
    // }, (e:any) => console.log(e.data)
      
    // );
    // this.dataEditForm.reset();
  }

 
  onWillDismiss() {
    this.modalEdit = false
  }

  handleChange(e: any) {
    this.allergiesAdded.push(
      { "id": parseInt(e.detail.value), 
      "name": this.allergies[this.findIndexById(e.detail.value)].name 
    });
  }

  addName(e: any, id: number) {
    this.allergiesAdded.map(item => {
      if (item.id === id) {
        item.name = e.detail.value
        return item;
      } else {
        return item;
      }
    });
  }

  removeAllergy(id: any) {
    this.allergiesAdded = this.allergiesAdded.filter((item) => item.id !== id);
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.allergies.length; i++) {
      if (this.allergies[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

   itemExists(id: number): boolean {
    if(this.allergiesAdded.some(item => item.supply_id === id)){
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
