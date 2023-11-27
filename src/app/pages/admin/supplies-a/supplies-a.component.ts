import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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
  results: any[] = [];
  supply: any = null
  imageSrc: SafeResourceUrl | undefined;
  base64String: string | undefined;

  supplyForm = this.formBuilder.group({
    name: null,
    cost: null,
    price: null,
    is_salable: null,
    buy_unit: null,
    use_unit: null,
    equivalence: null,
  });

  supplyEditForm = this.formBuilder.group({
    name: null,
    cost: null,
    price: null,
    is_salable: null,
    buy_unit: null,
    use_unit: null,
    equivalence: null,
  });

  modalAdd = false
  modalDetails = false
  modalEdit = false
  modalDelete = false

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.api.getSupplies().then((response: any) => { 
      this.data = response.data;
      this.results = [...this.data]
     });
  }

  openAdd() {
    this.modalAdd = true
  }

  onSubmit() {

    this.api.insertSupply(this.supplyForm.value, this.base64String).then(
      (response: any) => {
        this.presentToast()
        this.supplyForm.reset();
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

  openEdit(id: any) {
    this.modalEdit = true
    this.api.getSupply(id).then((response: any) => {
      this.supply = response.data
      this.supplyEditForm.value.is_salable = this.supply.is_salable
      this.supplyEditForm.value.equivalence = this.supply.equivalence
      this.imageSrc = this.getImgSrcFromBase64(response.data.image)
      this.base64String = response.data.image
    })

  }

  onSubmitEdit() {
    this.api.updateSupply(this.supply.id, this.supplyEditForm.value, this.base64String).then(
      (response: any) => {
        this.presentToast()
        this.supply = null
        this.imageSrc = undefined
        this.base64String = undefined
        this.getData();
        this.modalEdit = false
      }
    );
    this.supplyEditForm.reset();
  }

  openDetails(id: any) {

    this.modalDetails = true

    this.api.getSupply(id).then((response: any) => {
      this.supply = response.data;
    })
  }

  openDelete(id: any) {
    this.modalDelete = true
    this.api.getSupply(id).then((response: any) => {
      this.supply = response.data
    })
  }


  deleteSupply() {
    this.api.deleteSupply(this.supply.id).then(
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
        const fullName = d.name.toLowerCase();
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
