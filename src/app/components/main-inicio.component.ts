// Importaciones
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-inicio',
  templateUrl: '../views/main-inicio.component.html',
  styleUrls: ['../../assets/css/main-inicio.component.css']
})
export class MainInicioComponent implements OnInit {

  // Constructor
  constructor(private router: Router) { }

  // Método que se lanza al iniciar el componente
  ngOnInit(): void {
  }

  /**
   * Método que navega a la página de libros, pasando por parametro
   * un string para filtrar los libros de la base de datos
   * @param filtro
   */
  opcionLibros(filtro: String){
    scrollTo(0, 0)
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['libros', filtro]);
    })
  }

 /**
   * Método que navega a la página de eventos
   */
  opcionEventos(){
    scrollTo(0, 0)
    this.router.navigate(['eventos']);
  }

  /**
   * Método que navega a la página del blog
   */
  opcionBlog(){
    scrollTo(0, 0)
    this.router.navigate(['blog'])
  }

}
