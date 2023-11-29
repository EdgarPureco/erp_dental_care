import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-account-p',
  templateUrl: './account-p.component.html',
  styleUrls: ['./account-p.component.scss'],
})
export class AccountPComponent  implements OnInit {

  constructor(private toastController: ToastController, private formBuilder: FormBuilder, 
    private api: ApiService, private sanitizer: DomSanitizer) {
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
    name: [null, [Validators.required]],
    surname: [null, [Validators.required]],
    lastname: [null, [Validators.required]],
    birthday: [null, [Validators.required]],
    sex: [null, [Validators.required]],
    address: [null, [Validators.required]],
    cp: [null, [Validators.required]],
    phone: [null, [Validators.required]],
    email: [null, [Validators.required]],
    allergies: []
    
  });

  getData() {
    this.api.getMyInfo('patients').then((response:any) => {
      this.data = response.data; 
      console.log( "HALO",response.data)
    });
  }

  openEdit() {
    this.modalEdit = true
    this.allergiesAdded = this.data.allergies    
    this.api.getAllergies('all').then((response:any) => {
      this.allergies=response.data
    });
  }

  onSubmitEdit() {
    console.log(this.allergiesAdded);
    
    this.api.updatePatientInfo(this.dataEditForm.value, this.allergiesAdded).then(
      (response:any) => { 
        this.presentToast()
        this.modalEdit = false 
        this.getData()
    }, (e:any) => console.log(e.data)
      
    );
    this.dataEditForm.reset();
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
    if(this.allergiesAdded.some(item => item.id === id)){
      return false
    }
    return true
}


getImgSrcFromBase64(base64String: string): SafeResourceUrl {
  return this.sanitizer.bypassSecurityTrustResourceUrl(base64String);
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
