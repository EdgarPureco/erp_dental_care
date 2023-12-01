import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-records-d',
  templateUrl: './records-d.component.html',
  styleUrls: ['./records-d.component.scss'],
})
export class RecordsDComponent implements OnInit {

  
  constructor(private toastController: ToastController, private formBuilder: FormBuilder, private api: ApiService) {
  }

  data: any[] = [];
  loading: boolean = false;
  results: any[] = [];
  supplies: any[] = [];
  suppliesAdded: any[] = [];
  service: any = null

  modalDetails = false

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true
    this.api.getDentistRecords().then((response:any) => { 
      this.data = response.data;
      this.results = [...this.data]
      this.loading = false
      
     });
  }


  openDetails(id: any) {
    this.modalDetails = true
    this.service= this.data[this.findIndexById(id)]
    console.log(this.service);
    
  }
  onWillDismiss() {
    this.loading = false
    this.modalDetails = false
  }



  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

   itemExists(id: number): boolean {
    if(this.suppliesAdded.some(item => item.supply_id === id)){
      return false
    }
    return true
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
      const person = d.person;
      const fullName = `${person.name} ${person.lastname} ${person.surname}`.toLowerCase();
      return fullName.includes(query.toLowerCase());
    });
  }
  
}


  // Secondary Functions

  formatDateToLetter(date: any) {
    var startDate = new Date(date);

    const formattedDate = new Intl.DateTimeFormat('es-ES', { hour: 'numeric', minute: 'numeric', weekday: 'short', month: 'numeric', day: 'numeric'}).format(startDate);

    return formattedDate;
  }

}
