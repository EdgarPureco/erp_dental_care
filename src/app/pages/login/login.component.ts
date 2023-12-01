import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import OneSignal from 'onesignal-cordova-plugin';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor(public api: ApiService, private toastController: ToastController, private formBuilder: FormBuilder, private router: Router,) {
  }

  login: any = { "email": '', "password": '' };
  returnUrl: string = '';
  loading: boolean = false;

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  ngOnInit() {
    if (this.isLoggedIn()) {
      var role = localStorage.getItem('role');
      if (role) {
        this.router.navigate(['pages/' + role.toLowerCase() + "/home"]);
      }
    }
  }

  isLoggedIn(): boolean {
    let status = false;
    if (localStorage.getItem('isLoggedIn') == "true") {
      status = true;
    }
    else {
      status = false;
    }
    return status;
  }

  onSubmitLogin() {
    this.loading = true
    let email = this.loginForm.value.email
    this.api.login(this.loginForm.value).then((response: any) => {

      if (response.data.message.includes("User logged successfully")) {

        localStorage.setItem('isLoggedIn', "true");
        localStorage.setItem('role', response.data.role);
        localStorage.setItem('token', response.data.token);

        switch (localStorage.getItem('role')?.toLocaleLowerCase()) {
          case 'admin':
            this.returnUrl = 'pages/admin/patients'
            break;
          case 'patient':
            this.returnUrl = 'pages/patient/home'
            break;
          case 'dentist':
            this.returnUrl = 'pages/dentist/home'
            break;
        }
        if (Capacitor.getPlatform() !== 'web') {
          if (email) {
            OneSignal.login(email);
          }
        }

        this.router.navigate([this.returnUrl]);

      } else {

        if (response.data.message.includes('exist')) {
          this.presentToast('Correo incorrecto', 'danger');
        } else {
          this.presentToast('Contraseña incorrecta', 'danger');

        }
      }
      this.loading = false;
    },(e) => {
      this.presentToast('Error en el Servidor, ', 'danger')
      this.loading = false
      console.log('Error', e);
    }
    );
    this.loginForm.reset();
    this.loading = false;
  }

  async presentToast(message: string, type: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: type
    });

    await toast.present();
  }
}
