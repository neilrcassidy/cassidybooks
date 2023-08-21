// Importaciones
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: '../views/dashboard.component.html',
  styleUrls: ['../../assets/css/dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // Constructor
  constructor(private router: Router) { }

  // Método que se ejecuta al lanzar el componente
  ngOnInit(): void {
  }

  /**
   * Método que navega a la opcion de libros en el dashboard
   */
  opcionLibros(){
    this.router.navigate(['dashboard/libros'])
  }

  /**
   * Método que navega a la opcion de eventos en el dashboard
   */
  opcionEventos(){
    this.router.navigate(['dashboard/eventos'])
  }

  /**
   * Método que navega a la opcion de posts en el dashboard
   */
  opcionPosts(){
    this.router.navigate(['dashboard/posts'])
  }

  /**
   * Método que navega a la opcion de subir imagen en el dashboard
   */
  opcionSubirImagen(){
    this.router.navigate(['dashboard/subirimagen'])
  }

}
