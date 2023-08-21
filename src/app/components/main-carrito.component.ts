// Importaciones
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LibrosService } from '../services/libros.service';

@Component({
  selector: 'app-main-carrito',
  templateUrl: '../views/main-carrito.component.html',
  styleUrls: ['../../assets/css/main-carrito.component.css']
})
export class MainCarritoComponent implements OnInit {
  // Declaraciones
  public loggedin!: Boolean;
  public librosInCarrito!: Array<any>;
  public libroSeleccionado: any;
  public total: any;
  public iva: any;
  public totalSinIva: any;

  // Constructor
  constructor(private router: Router, 
    private librosService: LibrosService,
    private toastr: ToastrService) { }

  // Método que se ejecuta al lanzar el componente
  ngOnInit(): void {
    // if que determina si hay un usuario con la sesión iniciada o no
    if(localStorage.getItem('user-id') && localStorage.getItem('x-access-token')){
      this.loggedin = true;
    } else {
      this.loggedin = false;
    }

    /* if que hace que si se intenta navegar a esta página sin haber 
    iniciado sesión, volverá a la página inicial*/
    if(!this.loggedin){
      this.router.navigate(['']).then(() => {
        window.location.reload();
      })
    }

    // Consulta a la base de datos
    this.librosService.getLibrosInCarrito().subscribe((data: any) => {
      this.librosInCarrito = data;
      this.libroSeleccionado = data;

      this.total = 0;
      var i = 0;
      while(this.librosInCarrito.length > i){
        this.total += this.librosInCarrito[i].precio*(1-(this.librosInCarrito[i].descuento/100))
        i+=1
      }

      this.totalSinIva = this.total*0.79;
      this.iva = this.total*0.21;
    })
  }

  /**
   * Método que consulta a la base de datos
   * @param _id 
   */
  consultar(_id: any){
    this.libroSeleccionado = null;

    this.librosService.getLibro(_id).subscribe((data: any) => {
      this.libroSeleccionado = data;
    })
  }

  /**
   * Método que borra libros del carrito
   * @param _id 
   */
  borrarDelCarrito(_id: any){
    this.librosService.removeFromCarrito(_id);

    window.location.reload();
  }

}
