import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class SendInfoService {


  private baseUrl = 'http://localhost:3001';

  private authStatus = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http: HttpClient, private router: Router) {

  }


  enviarRegistro(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/login`, data);
  }


  enviarLogin(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/api/login`, data).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token); // Guardar el token en LocalStorage
      })
    );
  }



  logout() {
    localStorage.removeItem('token');
    this.authStatus.next(false); // Actualizar el estado de autenticación
    this.router.navigate(['/login']);
  }





  // Método para verificar si el token existe
  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  get isLoggedIn(): Observable<boolean> {
    return this.authStatus.asObservable();
  }




  // Método para verificar si el token es válido (no ha expirado)
  validateToken(): boolean {
    const token = localStorage.getItem('token');  // Obtener el token del localStorage

    if (!token) return false;  // Si no hay token, retornar false

    try {
      const decodedToken: any = jwtDecode(token);  // Decodificar el token
      const currentTime = Math.floor(new Date().getTime() / 1000);  // Obtener el tiempo actual en segundos

      // Verificar si el token ha expirado
      if (decodedToken.exp && decodedToken.exp > currentTime) {
        return true;  // El token es válido
      } else {
        // Si el token ha expirado, eliminarlo de localStorage
        localStorage.removeItem('token');
        return false;  // Token expirado o inválido
      }
    } catch (error) {
      // En caso de error al decodificar el token, eliminarlo de localStorage
      localStorage.removeItem('token');
      return false;
    }
  }






}
