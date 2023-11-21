import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  constructor(public api: ApiService, private toastController: ToastController, private formBuilder: FormBuilder, private router: Router,) {
  }

  login: any = {"email": '', "password": ''};
  returnUrl: string = '';

  loginForm = this.formBuilder.group({
    email: null,
    password: null,
  });

  ngOnInit() {
  }

  onSubmitLogin() {
    this.api.login(this.loginForm.value).then((response:any) => {

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
        this.router.navigate([this.returnUrl]);
      } else {
        console.log("HALO error");
        
      }
    }, (e:any)=>console.log("HALO ERROR",e)
    );
    this.loginForm.reset();
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
}
