import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
    let todayDate = new Date();
    let maxBirthDate = new Date(`${todayDate.getFullYear() - 20}-12-31`);
    this.maxDate = todayDate.toISOString()

    this.maxDateBirth = maxBirthDate.toISOString();
  }

  data: any[] = [];
  loading: boolean = false;
  results: any[] = [];
  frequencies: any[] = [];
  dentist: any = null
  maxDateBirth: any;
  maxDate: any;
  imageSrc: SafeResourceUrl | undefined;
  base64String: string | undefined;

  dentistForm = this.formBuilder.group({
    name: [null, [Validators.required]],
    surname: [null, [Validators.required]],
    lastname: [null, [Validators.required]],
    birthday: [null, [Validators.required]],
    sex: [null, [Validators.required]],
    address: [null, [Validators.required]],
    cp: [null, [Validators.required, Validators.minLength(5)]],
    phone: [null, [Validators.required]],

    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required]],

    professional_license: [null, [Validators.required]],
    hired_at: [null, [Validators.required]],
    position: [null, [Validators.required]],
    time: null
  });

  dentistEditForm = this.formBuilder.group({
    name: [null, [Validators.required]],
    surname: [null, [Validators.required]],
    lastname: [null, [Validators.required]],
    birthday: [null, [Validators.required]],
    sex: [null, [Validators.required]],
    address: [null, [Validators.required]],
    cp: [null, [Validators.required]],
    phone: [null, [Validators.required]],

    email: [null, [Validators.required, Validators.email]],

    professional_license: [null, [Validators.required]],
    hired_at: [null, [Validators.required]],
    position: [null, [Validators.required]],
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
    this.loading = true
    this.api.getDentists('all').then((response: any) => {
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
    this.api.insertDentist(this.dentistForm.value, this.base64String).then(
      (response: any) => {
        if (response.data.message) {
          this.presentToast('Error: Hay otro usuario con el mismo correo', 'danger')
        } else {
          this.presentToast('Éxito: Dentista registrado', 'success')
          this.dentistForm.reset();
          this.imageSrc = undefined
          this.base64String = undefined
          this.getData()
          this.modalAdd = false
        }
        this.loading = false

      }, (e) => {
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


  openDetails(id: any) {

    this.modalDetails = true

    this.api.getDentist(id).then((response: any) => {
      this.dentist = response.data;
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    })
  }

  openEdit(id: any) {
    this.modalEdit = true
    this.api.getDentist(id).then((response: any) => {
      this.dentist = response.data
      this.dentistEditForm.value.sex = this.dentist.person.sex
      this.imageSrc = this.getImgSrcFromBase64(response.data.user.image)
      this.base64String = response.data.user.image
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    })

  }

  onSubmitEdit() {
    this.loading = true
    this.api.updateDentist(this.dentist.id, this.dentistEditForm.value, this.base64String).then(
      (response: any) => {
        if (response.data.message) {
          this.presentToast('Error: Hay otro usuario con el mismo correo', 'danger')
        } else {
          this.presentToast('Éxito: Dentista actualizado', 'success')
          this.dentistEditForm.reset();
          this.imageSrc = undefined
          this.base64String = undefined
          this.getData()
        }
        this.modalEdit = false
        this.loading = false
      },(e) => {
        this.presentToast('Error en el Servidor, ', 'danger')
        this.loading = false
        console.log('Error', e);
      }

    );
    this.dentistEditForm.reset();
  }
  openDelete(id: any) {
    this.modalDelete = true
    this.api.getDentist(id).then((response: any) => {
      this.dentist = response.data
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    })
  }

  deleteDentist() {
    this.loading = true
    this.api.deleteDentist(this.dentist.id).then(
      (response: any) => {
        if(response.status===200){
          this.presentToast('Éxito: Dentista eliminado', 'success')
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
    );

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

  async presentToast(message: string, type: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
      color: type
    });

    await toast.present();
  }

  search(event: any) {
    const query = event.target.value.toLowerCase();

    if (query === '' || query === null) {
      this.results = [...this.data]
    } else {
      this.results = this.data.filter((d) => {
        const person = d.person;
        const fullName = `${person.name} ${person.lastname} ${person.surname}`.toLowerCase();
        return fullName.includes(query.toLowerCase());
      });
    }
  }

  filter($e: any) {
    this.api.getDentists($e.detail.value).then((response: any) => {
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
