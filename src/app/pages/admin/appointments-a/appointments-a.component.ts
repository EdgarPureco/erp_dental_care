import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CheckboxCustomEvent, ToastController } from '@ionic/angular';
import { MaskitoElementPredicateAsync, MaskitoOptions } from '@maskito/core';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-appointments-a',
  templateUrl: './appointments-a.component.html',
  styleUrls: ['./appointments-a.component.scss'],
})
export class AppointmentsAComponent implements OnInit {

  constructor(private toastController: ToastController, private formBuilder: FormBuilder, private api: ApiService) {
    let todayDate = new Date();
    todayDate.setHours(0,0,0,0)
    this.minDate = todayDate.toISOString()

  }

  data: any[] = [];
  loading: boolean = false;
  results: any[] = [];
  patients: any[] = [];
  dentists: any[] = [];
  patientsAct: any[] = [];
  dentistsAct: any[] = [];
  supplies: any[] = [];
  suppliesAdded: any[] = [];
  services: any[] = [];
  servicesAdded: any[] = [];
  finish: any = null
  minDate: any = null
  appointment: any = null

  appointmentForm = this.formBuilder.group({
    dentist_id: [null, [Validators.required]],
    patient_id: [null, [Validators.required]],
    start_date: [null, [Validators.required]],
    end_date: [null, [Validators.required]],

  });

  appointmentEditForm = this.formBuilder.group({
    dentist_id: [null, [Validators.required]],
    patient_id: [null, [Validators.required]],
    start_date: [null, [Validators.required]],
    end_date: [null, [Validators.required]],
  });

  modalAdd = false
  modalDetails = false
  modalEdit = false
  modalFinish = false
  modalDelete = false
  maxPL = 6
  minEndDate: any = null

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.loading = true
    this.api.getAppointments('all').then((response: any) => {
      this.data = response.data;
      this.results = [...this.data]
      this.loading = false
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    });
    this.api.getPatients('all').then((response: any) => {
      this.patients = response.data;
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    });
    this.api.getPatients('activo').then((response: any) => {
      this.patientsAct = response.data;
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    });
    this.api.getDentists('all').then((response: any) => {
      this.dentists = response.data;
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    });
    this.api.getDentists('activo').then((response: any) => {
      this.dentistsAct = response.data;
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
    this.api.insertAppointment(this.appointmentForm.value).then(
      (response: any) => {
        if(response.status===200){
          this.presentToast('Éxito: Cita registrada', 'success')
          this.appointmentForm.reset();
        }else{
          this.presentToast('Error', 'danger')
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
    this.modalFinish = false
    this.modalDelete = false
  }

  openEdit(id: any) {
    this.modalEdit = true
    this.api.getAppointment(id).then((response: any) => {
      this.appointment = response.data,
      console.log(this.appointment);
      this.minEndDate = this.appointment.end_date

    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    })

  }

  onSubmitEdit() {
    this.loading = true
    this.api.updateAppointment(this.appointment.id, this.appointmentEditForm.value).then(
      (response: any) => {
        console.log(response);
        
        if(response.status===200){
          this.presentToast('Éxito: Cita actualizada', 'success')
          this.appointmentEditForm.reset();
        }else{
          this.presentToast('Error', 'danger')
        }
        this.getData()
        this.loading = false
        this.modalEdit = false
      },(e) => {
        this.presentToast('Error en el Servidor, ', 'danger')
        this.loading = false
        console.log('Error', e);
      }
    );
    this.appointmentEditForm.reset();
  }

  openDetails(id: any) {

    this.modalDetails = true

    this.api.getAppointment(id).then((response: any) => {
      this.appointment = response.data;
      console.log(response.data);
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    })
  }


  addQuantitySupplies(e: any, id: number) {
    this.suppliesAdded.map(item => {
      if (item.supply_id === id) {
        item.quantity = parseInt(e.detail.value)
        return item;
      } else {
        return item;
      }
    });
  }

  removeSupply(id: any) {
    this.suppliesAdded = this.suppliesAdded.filter((item) => item.id !== id);
  }

  addQuantityServices(e: any, id: number) {
    this.servicesAdded.map(item => {
      if (item.service_id === id) {
        item.quantity = parseInt(e.detail.value)
        return item;
      } else {
        return item;
      }
    });
  }
  
  removeService(id: any) {
    this.servicesAdded = this.servicesAdded.filter((item) => item.id !== id);
  }

  
  openFinish(id: any) {
    this.modalFinish = true
    this.api.getAppointment(id).then((response: any) => {
      this.appointment = response.data
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    })
    this.api.getServices('activo').then((response: any) => {
      this.services = response.data
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    })
    this.api.getSupplies('activo').then((response: any) => {
      response.data.map((item:any)=>{
        if (item.stock>0) {
          this.supplies.push(item)
        }
      })
      console.log(this.supplies);
      
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    })
  }
  
  finishAppointment() {
    this.loading = true
    this.api.finishAppointment(this.appointment.id, this.servicesAdded, this.suppliesAdded).then(
      (response: any) => {
        if(response.status===200){
          this.presentToast('Éxito: Cita finalizada', 'success')
        }else{
          this.presentToast('Error', 'danger')
        }
        this.getData()
        this.loading = false
        this.modalFinish = false
      },(e) => {
        this.presentToast('Error en el Servidor, ', 'danger')
        this.loading = false
        console.log('Error', e);
      }
    );
  }

  notify(id: any) {
    this.loading = true
    this.api.sendNotification(id).then(
      (response: any) => {
        if(response.status===200){
          this.presentToast('Éxito: Notificación enviada', 'success')
        }else{
          this.presentToast('Error', 'danger')
        }
        this.loading = false
      },(e) => {
        this.presentToast('Error en el Servidor, ', 'danger')
        this.loading = false
        console.log('Error', e);
      }
    )
  }

  handleChangeSupplies(e: any) {
    this.suppliesAdded.push(
      {
        "supply_id": parseInt(e.detail.value),
        "quantity": 1
      });
  }

  handleChangeServices(e: any) {
    this.servicesAdded.push(
      {
        "service_id": parseInt(e.detail.value),
        "quantity": 1
      });
  }
  
  setEndDate(e: any) {
    this.minEndDate = e.detail.value
    
  }


  openDelete(id: any) {
    this.modalDelete = true
    this.api.getAppointment(id).then((response: any) => {
      this.appointment = response.data
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    })
  }


  deleteAppointment() {
    this.loading = true
    this.api.deleteAppointment(this.appointment.id).then(
      (response: any) => {
        if(response.status===200){
          this.presentToast('Éxito: Cita eliminada', 'success')
        }else{
          this.presentToast('Error', 'danger')
        }
        this.modalDelete = false
        this.getData();
        this.loading = false
      },(e) => {
        this.presentToast('Error en el Servidor, ', 'danger')
        this.loading = false
        console.log('Error', e);
      }
    )
  }


  findIndexByIdServices(id: string): number {
    let index = -1;
    for (let i = 0; i < this.services.length; i++) {
      if (this.services[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  serviceExists(id: number): boolean {
    if (this.servicesAdded.some(item => item.service_id === id)) {
      return false
    }
    return true
  }

  findIndexByIdSupplies(id: string): number {
    let index = -1;
    for (let i = 0; i < this.supplies.length; i++) {
      if (this.supplies[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  supplyExists(id: number): boolean {
    if (this.suppliesAdded.some(item => item.supply_id === id)) {
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
    console.log(this.results);
    
    if (query==='' || query===null) {
      this.results = [...this.data]
    }else{
      this.results = this.data.filter((d) => {
        const patient = d.patient.person;
        const dentist = d.dentist.person;
        const fullName = `${patient.name} ${patient.surname} ${patient.lastname} ${dentist.name} ${dentist.lastname} ${dentist.surname}`.toLowerCase();
        return fullName.includes(query.toLowerCase());
      });
    }
  }

  filter($e:any){
    this.api.getAppointments($e.detail.value).then((response: any) => {
      this.data = response.data;
      this.results = [...this.data]
      
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    });
  }

  // Secondary Functions

  formatDateToLetter(date: any) {
    var startDate = new Date(date);

    const formattedDate = new Intl.DateTimeFormat('es-ES', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'}).format(startDate);

    return formattedDate;
  }
  
  formatDateToNumbers(date: any) {
    var startDate = new Date(date);

    const formattedDate = new Intl.DateTimeFormat('es-ES', { hour: 'numeric', minute: 'numeric', weekday: 'short', year: 'numeric', month: 'long', day: 'numeric'}).format(startDate);

    return formattedDate;
  }

}
