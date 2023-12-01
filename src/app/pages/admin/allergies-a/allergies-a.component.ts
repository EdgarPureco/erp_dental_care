import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  loading: boolean = false;
  results: any[] = [];
  allergy: any = null

  allergyForm = this.formBuilder.group({
    name: ['', [Validators.required]],
  });

  allergyEditForm = this.formBuilder.group({
    name: ['', [Validators.required]],
  });

  modalAdd = false
  modalDetails = false
  modalEdit = false
  modalDelete = false

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true
    this.api.getAllergies('all').then((response: any) => { 
      this.data = response.data
      this.results = [...this.data]
      this.loading = false
     },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    });
  }

  openAdd() {
    this.modalAdd = true
  }

  onSubmit() {
    this.loading = true
    this.api.insertAllergy(this.allergyForm.value).then(
      (response: any) => {
        if(response.status==400){
          this.presentToast('Error: Ya existe este registro', 'danger')
        }else{
          this.presentToast('Éxito: Alergia registrada', 'success')
          this.allergyForm.reset();
        }
        this.getData()
        this.modalAdd = false
        this.loading = false
      },(e) => {
        this.presentToast('Error en el Servidor, ', 'danger')
        this.loading = false
        console.log('Error', e);
      }
    );
  }

  onWillDismiss() {
    this.loading = false
    this.modalAdd = false
    this.modalDetails = false
    this.modalEdit = false
    this.modalDelete = false
  }

  openEdit(id: any) {
    this.modalEdit = true
    this.api.getAllergy(id).then((response: any) => {
      this.allergy = response.data
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    })

  }

  onSubmitEdit() {
      this.loading = true
    this.api.updateAllergy(this.allergy.id, this.allergyEditForm.value).then(
      (response: any) => {
        if(response.status==400){
          this.presentToast('Error: Ya existe este registro', 'danger')
        }else{
          this.presentToast('Éxito: Alergia actualizada', 'success')
        }
        this.allergy = null
        this.getData();
        this.modalEdit = false
          this.loading = false
      },(e) => {
        this.presentToast('Error en el Servidor, ', 'danger')
        this.loading = false
        console.log('Error', e);
      }
    );
    this.allergyEditForm.reset();
  }

  openDetails(id: any) {

    this.modalDetails = true

    this.api.getAllergy(id).then((response: any) => {
      this.allergy = response.data;
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    })
  }

  openDelete(id: any) {
    this.modalDelete = true
    this.api.getAllergy(id).then((response: any) => {
      this.allergy = response.data
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    })
  }


  deleteAllergy() {
    this.loading = true
    this.api.deleteAllergy(this.allergy.id).then(
      (response: any) => {
        if(response.status===200){
          this.presentToast('Éxito: Alergia eliminada', 'success')
        }else{
          this.presentToast('Error', 'danger')
        }
        this.modalDelete = false;
        this.loading = false
        this.getData();
      },(e) => {
        this.presentToast('Error en el Servidor, ', 'danger')
        this.loading = false
        console.log('Error', e);
      }
    )
  }


  async presentToast(message:string, type:string) {
  const toast = await this.toastController.create({
    message: message,
    duration: 1500,
    position: 'top',
    color: type
  });

  await toast.present();
}

  search(event:any) {
    const query = event.target.value.toLowerCase();
    
    if (query==='' || query===null) {
      this.results = [...this.data]
    }else{
      this.results = this.data.filter((d) => {
        const fullName = d.name.toLowerCase();
        console.log(fullName,query.toLowerCase());
        
        return fullName.includes(query.toLowerCase());
      });
    }
  }

  filter($e:any){
    this.api.getAllergies($e.detail.value).then((response: any) => {
      this.data = response.data;
      this.results = [...this.data]
      
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    });
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
