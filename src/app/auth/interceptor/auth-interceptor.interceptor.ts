import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

import {jwtDecode} from 'jwt-decode';
import { SendInfoService } from '../services/send-info.service';


// export const authInterceptor: HttpInterceptorFn = (req, next) => {

//   const token = localStorage.getItem('token');
  

//   if (token) {

//     const decodedToken: any = jwtDecode(token);

//     const currentTime = Math.floor(new Date().getTime() / 1000);
    
    
//     // Si el token ha expirado, eliminarlo y redirigir al login
//     if (decodedToken.exp < currentTime) {

//       localStorage.removeItem('token');

//       const router = inject(Router); // Inyecta Router de forma explícita



//       router.navigate(['/login']); // Redirigir al login si el token expira

//       return next(req);  // Asegúrate de pasar la solicitud
//     }

//     // Clona la solicitud y añade el token en el encabezado Authorization
//     const authReq = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     return next(authReq); // Pasa la solicitud modificada

//   }

//   return next(req); // Pasa la solicitud original si no hay token
  
// };





/*
EL INTERCEPTOR SOLO DEBERIA AÑADIR EL TOKEN AL ENCABEZADO
DE LAS SOLICITUDES SI EXISTE, SIN PREOCUPARSE POR SU VALIDEZ,
YA QUE ESO SE MANEJA EN EL GUARD

*/

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');

  if (token) {
    // Solo añade el token al encabezado si existe
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(authReq);
  }

  return next(req); // Si no hay token, pasa la solicitud original
};






