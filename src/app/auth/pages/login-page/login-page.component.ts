import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { SendInfoService } from '../../services/send-info.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {


  // --------------------------------------------------------------------
  // LOGICA FORMULARIO
  formularioLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private enviarFormulario: SendInfoService) {

    //FORMULARIO
    this.formularioLogin = this.fb.group({

      email: ['', Validators.required],

      password: ['', Validators.required],


    });

  }
  // --------------------------------------------------------------------


  onSubmit() {
    if (this.formularioLogin.valid) {
      const formData = this.formularioLogin.value;

      this.enviarFormulario.enviarLogin(formData)
        .pipe(

          catchError(error => {

            if (error.status === 401) {
              console.warn('No autorizado, redirigiendo al login.');
              this.enviarFormulario.logout();
            } else {
              console.warn('Error al enviar:', error);
            }
            return of(null); // Retorna un observable de null en caso de error


          })


        )
        .subscribe(response => {
          if (response) {
            console.log('Enviado con éxito');
          }
        });
    } else {
      return;
    }
    
  }

}

