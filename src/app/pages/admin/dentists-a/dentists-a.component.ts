import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CheckboxCustomEvent, ToastController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-dentists-a',
  templateUrl: './dentists-a.component.html',
  styleUrls: ['./dentists-a.component.scss'],
})
export class DentistsAComponent implements OnInit {

  constructor(private toastController: ToastController, private formBuilder: FormBuilder, private api: ApiService, private sanitizer: DomSanitizer) {
    let fechaActual = new Date();

    fechaActual.setFullYear(fechaActual.getFullYear() - 5);

    this.maxDateBirth = fechaActual;
  }

  data: any[] = [];
  results: any[] = [];
  frequencies: any[] = [];
  dentist: any = null
  maxDateBirth: Date;
  maxDate = new Date();
  imageSrc: SafeResourceUrl | undefined;
  base64String: string | undefined;

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
    time: null
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
    this.api.getDentists().then((response: any) => { this.data = response.data,  this.results = [...this.data] });
  }

  openAdd() {
    this.modalAdd = true
  }

  onSubmit() {

    this.api.insertDentist(this.dentistForm.value, this.base64String).then(
      (response: any) => {
        this.presentToast()
        this.dentistForm.reset();
        this.imageSrc = undefined
        this.base64String = undefined
        this.getData()
        this.modalAdd = false
      }
    );
  }
  
  onWillDismiss() {
    this.modalAdd = false
    this.modalDetails = false
    this.modalEdit = false
    this.modalDelete = false
    this.imageSrc = undefined
    this.base64String = undefined
  }

  
  openDetails(id: any) {

    this.modalDetails = true

    this.api.getDentist(id).then((response: any) => {
      this.dentist = response.data;
    })
  }

  openEdit(id: any) {
    this.modalEdit = true
    this.api.getDentist(id).then((response: any) => {
      this.dentist = response.data
      this.dentistEditForm.value.sex = this.dentist.person.sex
      this.imageSrc = this.getImgSrcFromBase64(response.data.user.image)
      this.base64String = response.data.user.image
    })
    
  }
  
  onSubmitEdit() {
    this.api.updateDentist(this.dentist.id, this.dentistEditForm.value, this.base64String).then(
      (response: any) => {
        this.presentToast()
        this.imageSrc = undefined
        this.base64String = undefined
        this.getData();
        this.modalEdit = false
      }, (e: any) => console.log(e.data)

    );
    this.dentistEditForm.reset();
  }
  openDelete(id: any) {
    this.modalDelete = true
    this.api.getDentist(id).then((response: any) => {
      this.dentist = response.data
    })
  }
  
  deleteDentist() {
    this.api.deleteDentist(this.dentist.id).then(
      (response: any) => {
        this.modalDelete = false
        this.getData();
      }
    )
  }


  onFileSelected(event: any): void {
    const file = event.target.files[0];
    
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        this.imageSrc = e.target?.result as string;
        this.convertToBase64(file);
      };

      reader.readAsDataURL(file);
    }
  }

  convertToBase64(file: File): void {
    const reader = new FileReader();

    reader.onloadend = () => {
      this.base64String = reader.result as string;
    };

    reader.readAsDataURL(file);
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

  search(event:any) {
    const query = event.target.value.toLowerCase();
    
    if (query==='' || query===null) {
      this.results = [...this.data]
    }else{
      this.results = this.data.filter((d) => {
        const person = d.person;
        const fullName = `${person.name} ${person.lastname} ${person.surname}`.toLowerCase();
        return fullName.includes(query.toLowerCase());
      });
    }
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
