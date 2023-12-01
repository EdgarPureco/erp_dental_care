import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CheckboxCustomEvent, ToastController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-supplies-a',
  templateUrl: './supplies-a.component.html',
  styleUrls: ['./supplies-a.component.scss'],
})
export class SuppliesAComponent implements OnInit {

  constructor(private toastController: ToastController, private formBuilder: FormBuilder, private api: ApiService, private sanitizer: DomSanitizer) {
  }

  data: any[] = [];
  loading: boolean = false;
  results: any[] = [];
  supply: any = null
  imageSrc: SafeResourceUrl | undefined;
  base64String: string | undefined;
  isSalable: boolean = true;

  supplyForm = this.formBuilder.group({
    name: [null, [Validators.required]],
    cost: [null, [Validators.required, Validators.min(1)]],
    price: [null, [ Validators.min(1)]],
    is_salable: [null, [Validators.required]],
    buy_unit: [null, [Validators.required]],
    use_unit: [null, [Validators.required]],
    equivalence: [null, [Validators.required]],
  });

  supplyEditForm = this.formBuilder.group({
    name: [null, [Validators.required]],
    cost: [null, [Validators.required, Validators.min(1)]],
    price: [null, [ Validators.min(1)]],
    is_salable: [null, [Validators.required]],
    buy_unit: [null, [Validators.required]],
    use_unit: [null, [Validators.required]],
    equivalence: [null, [Validators.required]],
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
    this.api.getSupplies('all').then((response: any) => { 
      this.data = response.data;
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
    this.api.insertSupply(this.supplyForm.value, this.base64String).then(
      (response: any) => {
        console.log(response);
        
        if(response.status==400){
          this.presentToast('Error: Ya existe este registro', 'danger')
        }else{
          this.presentToast('Éxito: Insumo registrado', 'success')
          this.supplyForm.reset();
          this.imageSrc = undefined
          this.base64String = undefined
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
    this.imageSrc = undefined
    this.base64String = undefined
  }

  openEdit(id: any) {
    this.modalEdit = true
    this.api.getSupply(id).then((response: any) => {
      this.supply = response.data
      this.supplyEditForm.value.is_salable = this.supply.is_salable
      this.isSalable = this.supply.is_salable
      this.supplyEditForm.value.equivalence = this.supply.equivalence
      this.imageSrc = this.getImgSrcFromBase64(response.data.image)
      this.base64String = response.data.image
    })

  }

  onSubmitEdit() {
    this.loading = true
    this.api.updateSupply(this.supply.id, this.supplyEditForm.value, this.base64String).then(
      (response: any) => {
        if(response.status==400){
          this.presentToast('Error: Ya existe este registro', 'danger')
        }else{
          this.presentToast('Éxito: Insumo actualizado', 'success')
        }
        this.supply = null
        this.imageSrc = undefined
        this.base64String = undefined
        this.getData();
        this.modalEdit = false
        this.loading = false
      },(e) => {
        this.presentToast('Error en el Servidor, ', 'danger')
        this.loading = false
        console.log('Error', e);
      }
    );
    this.supplyEditForm.reset();
  }

  openDetails(id: any) {

    this.modalDetails = true

    this.api.getSupply(id).then((response: any) => {
      this.supply = response.data;
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    })
  }

  openDelete(id: any) {
    this.modalDelete = true
    this.api.getSupply(id).then((response: any) => {
      this.supply = response.data
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    })
  }


  deleteSupply() {
    this.loading = true
    this.api.deleteSupply(this.supply.id).then(
      (response: any) => {
        if(response.status===200){
          this.presentToast('Éxito: Insumo eliminado', 'success')
        }else{
          this.presentToast('Error', 'danger')
        }
        this.modalDelete = false;
        this.getData();
        this.loading = false
      },(e) => {
        this.presentToast('Error en el Servidor, ', 'danger')
        this.loading = false
        console.log('Error', e);
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
        return fullName.includes(query.toLowerCase());
      });
    }
  }

  filter($e:any){
    this.api.getSupplies($e.detail.value).then((response: any) => {
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
