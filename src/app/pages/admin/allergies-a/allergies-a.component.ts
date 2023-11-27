import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CheckboxCustomEvent, ToastController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-allergies-a',
  templateUrl: './allergies-a.component.html',
  styleUrls: ['./allergies-a.component.scss'],
})
export class AllergiesAComponent implements OnInit {

  constructor(private toastController: ToastController, private formBuilder: FormBuilder, private api: ApiService) {
  }

  data: any[] = [];
  allergy: any = null

  allergyForm = this.formBuilder.group({
    name: null,
  });

  allergyEditForm = this.formBuilder.group({
    name: null,
  });

  modalAdd = false
  modalDetails = false
  modalEdit = false
  modalDelete = false

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.api.getAllergies().then((response: any) => { this.data = response.data });
  }

  openAdd() {
    this.modalAdd = true
  }

  onSubmit() {

    this.api.insertAllergy(this.allergyForm.value).then(
      (response: any) => {
        this.presentToast()
        this.allergyForm.reset();
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
  }

  openEdit(id: any) {
    this.modalEdit = true
    this.api.getAllergy(id).then((response: any) => {
      this.allergy = response.data
    })

  }

  onSubmitEdit() {
    this.api.updateAllergy(this.allergy.id, this.allergyEditForm.value).then(
      (response: any) => {
        this.presentToast()
        this.allergy = null
        this.getData();
        this.modalEdit = false
      }
    );
    this.allergyEditForm.reset();
  }

  openDetails(id: any) {

    this.modalDetails = true

    this.api.getAllergy(id).then((response: any) => {
      this.allergy = response.data;
    })
  }

  openDelete(id: any) {
    this.modalDelete = true
    this.api.getAllergy(id).then((response: any) => {
      this.allergy = response.data
    })
  }


  deleteAllergy() {
    this.api.deleteAllergy(this.allergy.id).then(
      (response: any) => {
        this.modalDelete = false
        this.getData();
      }
    )
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
