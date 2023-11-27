import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-inventory-a',
  templateUrl: './inventory-a.component.html',
  styleUrls: ['./inventory-a.component.scss'],
})
export class InventoryAComponent implements OnInit {

  constructor(private toastController: ToastController, private formBuilder: FormBuilder, private api: ApiService, private sanitizer: DomSanitizer) {
  }

  data: any[] = [];
  results: any[] = [];
  inventory: any[] = [];
  buys: any[] = [];
  sells: any[] = [];
  supply_id: any = null
  supply: any = null
  expires = false

  supplyForm = this.formBuilder.group({
    supply_id: null,
    quantity: null,
    expiration_date: null
  });


  modalAdd = false
  modalDetails = false
  modalBuys = false
  modalSells = false

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.api.getSupplies().then((response:any) => { 
      this.data = response.data;
      this.results = [...this.data]
     });
  }

  openAdd(id:any) {
    this.modalAdd = true
    this.supply_id = id
  }
  
  onSubmit() {
    
    this.supplyForm.value.supply_id = this.supply
    this.api.buySupply(this.supplyForm.value).then(
      (response:any) => {
        this.modalAdd = false
        this.supplyForm.reset();
        this.getData()
        this.presentToast()        
      }
    );
  }

  onWillDismiss() {
    this.modalAdd = false
    this.modalDetails = false
  }


  openDetails(id: any) {

    this.modalDetails = true

    this.api.getSupply(id).then((response:any) => {
      this.supply = response.data;
    })
    this.api.getSupplyInventory(id).then((response:any) => {
      this.inventory = response.data;
      
    })
  }

  openBuys(id: any) {

    this.modalBuys = true

    this.api.getSupplyBuys(id).then((response:any) => {
      this.buys = response.data, console.log(response.data);
      ;
    })
  }
  openSells(id: any) {

    this.modalSells = true

    this.api.getSupplySells(id).then((response:any) => {
      this.sells = response.data, console.log(response.data);
      ;
    })
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

formatDateToLetter(date: any) {
  var startDate = new Date(date);

  const formattedDate = new Intl.DateTimeFormat('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}).format(startDate);

  return formattedDate;
}

}
