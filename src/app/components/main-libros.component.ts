// Importaciones
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LibrosService } from '../services/libros.service';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-main-libros',
  templateUrl: '../views/main-libros.component.html',
  styleUrls: ['../../assets/css/main-libros.component.css']
})
export class MainLibrosComponent implements OnInit {

  // Declaraciones
  public libros: any;
  public libroSeleccionado: any;
  public filtro: any;
  public title: any;
  public notLoggedIn!: Boolean;
  public faCartPlus = faCartPlus

  // Constructor
  constructor(private librosService: LibrosService, 
    private route: ActivatedRoute, 
    private toastr: ToastrService) { }

    // Método que se ejecuta al iniciar el componente
  ngOnInit(): void {
    this.libros = null;

    // Conversión del parametro pasado por la URL a un string para gastar en la consulta
    this.filtro = new String(this.route.snapshot.paramMap.get('filtroConsulta'));

    console.log(this.filtro)

    // Consulta a la base de datos
    this.librosService.getAllLibros().subscribe((data: any) => {
      this.libroSeleccionado = data;
    })

    // if que determina que versión de la página cargar dependiendo del filtro
    if(this.filtro == 'fisico'){
      this.librosService.getLibrosFisico().subscribe((data: any) => {
        this.libros = data;
        this.title = "Libros Físicos"
      })
    } else if(this.filtro == 'ebook'){
      this.librosService.getLibrosEbook().subscribe((data: any) => {
        this.libros = data;
        this.title = "eBooks"
      })
    } else if(this.filtro == 'audio'){
      this.librosService.getLibrosAudio().subscribe((data: any) => {
        this.libros = data;
        this.title = "Libros en Audio"
      })
    } else if(this.filtro == 'ofertas'){
      this.librosService.getLibrosConDescuento().subscribe((data: any) => {
        this.libros = data;
        this.title = "Ofertas"
      })
    } else if(this.filtro.length == 0){
      this.librosService.getAllLibros().subscribe((data: any) => {
        this.libros = data;
        this.title = "Todos los libros"
      })
    } else {
      this.librosService.getLibroByTitulo(this.filtro).subscribe((data: any) => {
        this.libros = data;
        this.title = "Resultados de busqueda \"" + this.filtro + "\""
      })
    }

    // if que determina si hay un usuario que ha iniciado sesión
    if(!localStorage.getItem('user-id') && !localStorage.getItem('x-access-token')){
      this.notLoggedIn = true;
    }
  }

  /**
   * Método que consulta la base de datos con el id
   * @param _id 
   */
  consultar(_id: any){
    this.libroSeleccionado = null;

    this.librosService.getLibro(_id).subscribe((data: any) => {
      this.libroSeleccionado = data;
    })
  }

  /**
   * Método que agrega un libro a la base de datos
   * @param _id 
   */
  agregarAlCarrito(_id: any){
    this.librosService.addToCarrito(_id);

    this.toastr.success('Libro agregado al carrito con éxito.', 'Vamos!', {positionClass: 'toast-bottom-right'})
  }

}
