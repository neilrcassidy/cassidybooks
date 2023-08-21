// Importaciones
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { faSearch, faUser, faUserSlash, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: '../views/header.component.html',
  styleUrls: ['../../assets/css/header.component.css']
})

export class HeaderComponent implements OnInit {
  // Declaraciones
  public formBuscar!: FormGroup

  public loggedin!: Boolean

  public faSearch = faSearch
  public faUser = faUser
  public faUserSlash = faUserSlash
  public faShoppingCart = faShoppingCart

  // Constructor
  constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService) { }

  // Método que se ejecuta al lanzar el componente
  ngOnInit(): void {
    // Construcción del formulario de busqueda
    this.formBuscar = this.formBuilder.group({
      busqueda: ['', [Validators.required, Validators.min(1)]]
    })

    // if que determina si un usuario ha iniciado sesión o no
    if(localStorage.getItem('user-id') && localStorage.getItem('x-access-token')){
      this.loggedin = true;
    }
  }

  /**
   * Método que navega a la página de inicio
   */
  opcionInicio(){
    this.router.navigate(['']);
  }

  /**
   * Método que navega a la página de libros, pasando por parametro
   * un string para filtrar los libros de la base de datos
   * @param filtro
   */
  opcionLibros(filtro: String){
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['libros', filtro]);
    })
  }

  /**
   * Método que navega a la página de eventos
   */
  opcionEventos(){
    this.router.navigate(['eventos']);
  }

  /**
   * Método que navega a la página del blog
   */
  opcionBlog(){
    this.router.navigate(['blog'])
  }

  /**
   * Método que navega a la página de iniciar sesión / registrar
   */
  opcionLogin(){
    this.router.navigate(['login'])
  }

  /**
   * Método que cierra la sesión del usuario
   */
  opcionLogout(){
    this.authService.logout();
    window.location.reload();
  }

  /**
   * Método que navega a la página de carrito
   */
  opcionCarrito(){
    this.router.navigate(['carrito'])
  }

  /**
   * Método realiza una consulta y navega a la página de libros
   */
  opcionBuscar(){
    const busqueda: string = this.formBuscar.value.busqueda
    this.router.navigate(['libros', busqueda])
    this.formBuscar.reset();
  }
}
