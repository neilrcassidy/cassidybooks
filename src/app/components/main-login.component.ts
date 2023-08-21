// Importaciones
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-login',
  templateUrl: '../views/main-login.component.html',
  styleUrls: ['../../assets/css/main-login.component.css']
})
export class MainLoginComponent implements OnInit {
  // Declaraciones
  public formLogin!: FormGroup

  // Constructor
  constructor(private formBuilder: FormBuilder, 
    private router: Router, 
    private authService: AuthService,
    private toastr: ToastrService) {}

  // Método que se lanza al iniciar el componente
  ngOnInit(): void {
    // Construcción del formulario del login
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.min(1)]],
      password: ['', [Validators.required, Validators.min(1)]]
    })
  }

  /**
   * Método que navega a la página de registrar
   */
  opcionRegistrar(){
    this.router.navigate(['registrar']);
  }

  /**
   * Método que recoge los datos del formulario e inicia sesión
   */
  opcionLogin(){
    const email: string = this.formLogin.value.email
    const password: string = this.formLogin.value.password
    this.authService.login(email, password).subscribe((res: HttpResponse<any>) => {
      console.log(res);

      this.toastr.success('Iniciando sesión, esto puede tardar unos segundos...', 'Vamos!', {positionClass: 'toast-bottom-right'});

      this.router.navigate(['']).then(()=>{
        window.location.reload();
      })
    }, (err: HttpErrorResponse) => {
      this.formLogin.reset()

      this.toastr.error('Usuario incorrecto o contraseña incorrecta, prueba de nuevo.', 'Error.', {positionClass: 'toast-bottom-right'});
    });
  }

}
