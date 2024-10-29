import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SendInfoService } from '../services/send-info.service';




export const authGuardGuard: CanActivateFn = (route, state) => {


  // Inyecta Router y SendInfoService de forma explícita
  const router = inject(Router);
  const sendInfoService = inject(SendInfoService);



  // Comprueba si hay token en localStorage
  const token = !!localStorage.getItem('token');


  // Valida si el token es válido
  const isTokenValid = sendInfoService.validateToken();

  

  if (token && isTokenValid) {

    // Si el token existe, permite el acceso.
    return true;

  } else {

    alert("TOKEN INVALIDO");

    // Redirigir a login si no está autenticado
    router.navigate(['/login']);

    // Denegar acceso
    return false;

  }
};
