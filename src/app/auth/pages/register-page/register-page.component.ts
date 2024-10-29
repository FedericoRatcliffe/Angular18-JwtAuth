import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SendInfoService } from '../../services/send-info.service';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

  ],
  providers: [
    SendInfoService,
  ],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.scss'
})
export class RegisterPageComponent {



  // --------------------------------------------------------------------
  // LOGICA FORMULARIO
  formularioRegistro: FormGroup;

  constructor(
    private fb: FormBuilder,
    private enviarFormulario: SendInfoService) {

    //FORMULARIO
    this.formularioRegistro = this.fb.group({

      email: ['', Validators.required],

      password: ['', Validators.required],


    });

  }
  // --------------------------------------------------------------------





  onSubmit() {
    if (!this.formularioRegistro.invalid) {
      const formData = this.formularioRegistro.value;
  
      this.enviarFormulario.enviarRegistro(formData)
        .pipe(
          catchError(error => {
            console.warn('Error al enviar:', error);
            // Retorna null u otro valor indicando que falló el envío
            return of(null); // Retorna un observable de null en caso de error
          })
        )
        .subscribe({
          next: (response) => {
            if (response) {
              console.log('Enviado con éxito'); // Solo se imprime si response no es null
            }
          },
          error: (error) => {
            console.warn('Error al suscribirse:', error);
          }
        });
    }
  }
  




}
