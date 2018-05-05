import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  
  registerForm: FormGroup;

  constructor(public navCtrl: NavController, public authData: AuthProvider, public formBuilder: FormBuilder) {
    /* usamos o formbuilder para validar os campos aqui pode criar validadores customizados
    como foi feito no email
    */
    this.registerForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, 
      EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.minLength(6),
      Validators.required])]
    })
  }

  voltarPagina(){
    this.navCtrl.pop();
  }

  registerUser(){
    //verificar se o form foi preenchido corretamente
    if (!this.registerForm.valid) {
      console.log(this.registerForm.value);
    } else {
      // faz login usando o provider auth
      this.authData.signupUser(this.registerForm.value.email, this.registerForm.value.password);
      this.navCtrl.pop();
    }
  }

}
