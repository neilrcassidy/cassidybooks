// Importaciones
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { WebRequestService } from '../services/web-request.service';

@Component({
  selector: 'app-main-registrar',
  templateUrl: '../views/main-registrar.component.html',
  styleUrls: ['../../assets/css/main-registrar.component.css']
})
export class MainRegistrarComponent implements OnInit {

  // Declaraciones
  public formRegistrar!: FormGroup

  // Constructor
  constructor(private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private webReqService: WebRequestService,
    private toastr: ToastrService) { }

  // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.formRegistrar = this.formBuilder.group({
      email: ['', [Validators.required, Validators.min(1), Validators.email]],
      password: ['', [Validators.required, Validators.min(1)]]
    })
  }

  /** 
   * Método que recoge datos del formulario y registra un usuario nuevo,
   * y con ello un carrito nuevo
   * */ 
  opcionRegistrar() {
    const email: string = this.formRegistrar.value.email
    const password: string = this.formRegistrar.value.password

    if (this.formRegistrar.valid) {
      if (this.formRegistrar.value.password.length >= 8) {
        this.authService.registrar(email, password).subscribe((res: HttpResponse<any>) => {
          this.toastr.success('Registrando, esto puede tardar unos segundos...', 'Vamos!', {positionClass: 'toast-bottom-right'});
          console.log(res);
          this.webReqService.createCarrito(String(res.headers.get('x-access-token'))).subscribe((res: HttpResponse<any>) => {
            console.log(res)
            this.formRegistrar.reset()
            this.router.navigate(['']).then(() => {
              window.location.reload();
            });
          })
        });
      } else {
        this.formRegistrar.reset()
        this.toastr.error('La contraseña no tiene suficientes carácteres (mínimo 8), prueba de nuevo.', 'Error.', {positionClass: 'toast-bottom-right'});
      }
    } else {
      this.formRegistrar.reset()
      this.toastr.error('El correo no es valido, prueba de nuevo.', 'Error.', {positionClass: 'toast-bottom-right'});
    }
  }

  /**
   * Método que navega a la página de iniciar sesión
   */
  opcionLogin() {
    this.router.navigate(['login']);
  }

}
