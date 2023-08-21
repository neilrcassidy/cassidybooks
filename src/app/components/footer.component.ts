// Importaciones
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: '../views/footer.component.html',
  styleUrls: ['../../assets/css/footer.component.css']
})
export class FooterComponent implements OnInit {

  // Constructor
  constructor(private router: Router) { }

  // Método que se ejecuta al lanzar el componente
  ngOnInit(): void {
  }

  /**
   * Método que navega a la opcion del dashboard
   */
  opcionDashboard(){
    scrollTo(0, 0)
    this.router.navigate(['dashboard'])
  }
}
