import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-account-d',
  templateUrl: './account-d.component.html',
  styleUrls: ['./account-d.component.scss'],
})
export class AccountDComponent implements OnInit {

  constructor(private toastController: ToastController, private formBuilder: FormBuilder,
    private api: ApiService, private sanitizer: DomSanitizer) {
    let todayDate = new Date();
    let maxBirthDate = new Date(`${todayDate.getFullYear() - 5}-12-31`);

    this.maxDateBirth = maxBirthDate.toISOString();
  }

  ngOnInit() {
    this.getData();
  }

  maxDateBirth: any;
  data: any = null
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
    email: [null, [Validators.required, Validators.email]],

  });

  getData() {
    this.api.getMyInfo('dentists').then((response: any) => {
      this.data = response.data; console.log("HALO", response.data)
    });
  }

  openEdit() {
    this.modalEdit = true
  }

  onSubmitEdit() {
    this.api.updateDentistInfo(this.data.id, this.dataEditForm.value).then(
      (response: any) => {
        this.presentToast('Exito', 'success')
        this.modalEdit = false
      }, (e: any) => console.log(e.data)

    );
    this.dataEditForm.reset();
  }


  onWillDismiss() {
    this.modalEdit = false
  }


  getImgSrcFromBase64(base64String: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(base64String);
  }

  async presentToast(message: string, type: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
      color: type
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
