// Importaciones
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { shareReplay, tap } from 'rxjs';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Constructor
  constructor(private webService: WebRequestService, private router: Router, private http: HttpClient) { }

  /**
   * Método que registra un usuario nuevo
   * @param email 
   * @param password 
   * @returns 
   */
  registrar(email: String, password: String){
    return this.webService.registrar(email, password).pipe(shareReplay(), tap((res: HttpResponse<any>) => {
      this.setSession(res.body._id, String(res.headers.get('x-access-token')), String(res.headers.get('x-refresh-token')));
    }))
  }
  
  /**
   * Método que inicia sesión
   * @param email 
   * @param password 
   * @returns 
   */
  login(email: String, password: String){
    return this.webService.login(email, password).pipe(shareReplay(), tap((res: HttpResponse<any>) => {
       this.setSession(res.body._id, String(res.headers.get('x-access-token')), String(res.headers.get('x-refresh-token')));
    }))
  }

  /**
   * Método que cierra sesión
   */
  logout(){
    this.removeSession();
    this.router.navigate(['']);
    console.log("Logged out")
  }

  /**
   * Método que devuelve el id del usuario que ha iniciado sesión
   * @returns 
   */
  getUserId() {
    return localStorage.getItem('user-id')
  }

  /**
   * Método que devuelve el access-token del usuario que ha iniciado sesión
   * @returns 
   */
  getAccessToken() {
    return localStorage.getItem('x-access-token');
  }

  /**
   * Método que devuelve el refresh-token del usuario que ha iniciado sesión
   * @returns 
   */
  getRefreshToken(){
    return localStorage.getItem('x-refresh-token');
  }

  /**
   * Método que agrega un access-token al local storage
   * @returns 
   */
  setAccessToken(accessToken: string){
    localStorage.setItem('x-access-token', accessToken)
  }

  
  private setSession(userId: string, accessToken: string, refreshToken: string){
    localStorage.setItem('user-id', userId);
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }

  /**
   * Método que quita la sesión actual a local storage
   * @returns 
   */
  private removeSession(){
    localStorage.removeItem('user-id');
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }

  /**
   * Método que consigue un access-token nuevo
   * @returns 
   */
  getNewAccessToken(){
    return this.http.get("/users/me/access-token", {
      headers: {
        'x-refresh-token': String(this.getRefreshToken),
        'user-id': String(this.getUserId)
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        this.setAccessToken(String(res.headers.get('x-access-token')))
      })
    )
  }
}
