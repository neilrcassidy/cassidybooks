// Importaciones
import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, empty, Observable, switchMap, tap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class WebRequestInterceptorService {
  // Constructor
  constructor(private authService: AuthService) { }
  
  // Declaraciones
  refreshingAccessToken!: Boolean

  /**
   * Método que determina si hace falta regenerar un access-token
   * @param request 
   * @param next 
   * @returns 
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    request = this.addAuthHeader(request);

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);

        if (error.status === 401 && !this.refreshingAccessToken) {
          return this.refreshAccessToken().pipe(switchMap(() => {
            request = this.addAuthHeader(request);
            return next.handle(request)
          }),
            catchError((err: any) => {
              console.log(err)
              this.authService.logout()
              return empty()
            })
          )
        }

        return throwError(error)
      })
    )
  }

  /**
   * Método que regenera el access-token
   * @returns 
   */
  refreshAccessToken() {
    this.refreshingAccessToken = true
    return this.authService.getNewAccessToken().pipe(
      tap(() => {
        console.log("Access Token Refreshed!")
        this.refreshingAccessToken = false
      })
    )
  }

  /**
   * Método que agrega los headers
   * @param request 
   * @returns 
   */
  addAuthHeader(request: HttpRequest<any>) {
    const token = this.authService.getAccessToken();
    if (token) {
      return request.clone({
        setHeaders: {
          'x-access-token': token
        }
      })
    }
    return request;
  }
}
