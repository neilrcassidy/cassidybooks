// Importaciones
import { Component, OnInit } from '@angular/core';
import { LibrosService } from '../services/libros.service';
import { faInfoCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-libros',
  templateUrl: '../views/dashboard-libros.component.html',
  styleUrls: ['../../assets/css/dashboard-libros.component.css']
})
export class DashboardLibrosComponent implements OnInit {
  // Declaraciones
  public libros: any
  public libroSeleccionado: any;
  public logoInfo = faInfoCircle
  public logoModificar = faEdit
  public logoEliminar = faTrashAlt
  public formInsertar!: FormGroup
  public formModificar!: FormGroup

  // Constructor
  constructor(private formBuilder: FormBuilder,
    private librosService: LibrosService,
    private toastr: ToastrService) { }

  // Método que se ejecuta al lanzar el componente
  ngOnInit(): void {
    // Consulta a la base de datos
    this.librosService.getAllLibros().subscribe((data) => {
      this.libros = data;
      this.libroSeleccionado = data;
    })

    // Construcción del formulario de insertar
    this.formInsertar = this.formBuilder.group({
      ISBN: ['', [Validators.required, Validators.min(1)]],
      titulo: ['', [Validators.required, Validators.min(1)]],
      autor: ['', [Validators.required, Validators.min(1)]],
      editorial: ['', [Validators.required, Validators.min(1)]],
      fecha: ['', [Validators.required, Validators.min(1)]],
      edicion: ['', [Validators.required, Validators.min(1)]],
      genero: ['', [Validators.required, Validators.min(1)]],
      precio: ['', [Validators.required, Validators.min(1)]],
      portada: ['', [Validators.required, Validators.min(1)]],
      tipo: ['', [Validators.required]],
      descuento: ['', [Validators.required]],
      stock: ['', [Validators.required, Validators.min(1)]]
    });

    // Construcción del formulario de modificar
    this.formModificar = this.formBuilder.group({
      ID: ['', [Validators.required, Validators.min(1)]],
      ISBN: ['', [Validators.required, Validators.min(1)]],
      titulo: ['', [Validators.required, Validators.min(1)]],
      autor: ['', [Validators.required, Validators.min(1)]],
      editorial: ['', [Validators.required, Validators.min(1)]],
      fecha: ['', [Validators.required, Validators.min(1)]],
      edicion: ['', [Validators.required, Validators.min(1)]],
      genero: ['', [Validators.required, Validators.min(1)]],
      precio: ['', [Validators.required, Validators.min(1)]],
      portada: ['', [Validators.required, Validators.min(1)]],
      tipo: ['', [Validators.required]],
      descuento: ['', [Validators.required]],
      stock: ['', [Validators.required, Validators.min(1)]]
    });
  }

  /**
   * Método que coge los datos del formulario de insertar y lo inserta en la base de datos
   */
  insertar() {
    if (this.formInsertar.valid) {
      const libro: any = {
        ISBN: this.formInsertar.value.ISBN,
        titulo: this.formInsertar.value.titulo,
        autor: this.formInsertar.value.autor,
        editorial: this.formInsertar.value.editorial,
        fecha: this.formInsertar.value.fecha,
        edicion: this.formInsertar.value.edicion,
        genero: this.formInsertar.value.genero,
        precio: this.formInsertar.value.precio,
        portada: this.formInsertar.value.portada,
        tipo: this.formInsertar.value.tipo,
        descuento: this.formInsertar.value.descuento,
        stock: this.formInsertar.value.stock
      }

      this.librosService.insertarLibro(libro)

      window.location.reload()
    } else {
      this.toastr.error('Falta algun campo por rellenar', '¡Cuidado!', { positionClass: 'toast-bottom-right' })
    }
  }

  /**
   * Método que rellena el formulario de modificar con datos del libro seleccionado
   * @param _id 
   */
  rellenaFormulario(_id: any) {
    this.libroSeleccionado = null;

    this.librosService.getLibro(_id).subscribe((data) => {
      this.libroSeleccionado = data;

      this.formModificar.setValue({
        ID: this.libroSeleccionado._id,
        ISBN: this.libroSeleccionado._isbn,
        titulo: this.libroSeleccionado.titulo,
        autor: this.libroSeleccionado.autor,
        editorial: this.libroSeleccionado.editorial,
        fecha: this.libroSeleccionado.fecha,
        edicion: this.libroSeleccionado.edicion,
        genero: this.libroSeleccionado.genero,
        precio: this.libroSeleccionado.precio,
        portada: this.libroSeleccionado.portada,
        tipo: this.libroSeleccionado.tipo,
        descuento: this.libroSeleccionado.descuento,
        stock: this.libroSeleccionado.stock
      })
    })
  }

  /**
   * Método que coge los datos del formulario de modificar y lo inserta en la base de datos
   */
  modificar() {
    if (this.formModificar.valid) {
      const libro: any = {
        ISBN: this.formModificar.value.ISBN,
        titulo: this.formModificar.value.titulo,
        autor: this.formModificar.value.autor,
        editorial: this.formModificar.value.editorial,
        fecha: this.formModificar.value.fecha,
        edicion: this.formModificar.value.edicion,
        genero: this.formModificar.value.genero,
        precio: this.formModificar.value.precio,
        portada: this.formModificar.value.portada,
        tipo: this.formModificar.value.tipo,
        descuento: this.formModificar.value.descuento,
        stock: this.formModificar.value.stock
      }

      this.librosService.modificarLibro(this.formModificar.value.ID, libro);

      window.location.reload()
    } else {
      this.toastr.error('Falta algun campo por rellenar', '¡Cuidado!', {positionClass: 'toast-bottom-right'})
    }
  }

  /**
   * Método que coge el id del libro seleccionado y lo elimina de la base de datos
   */
  eliminar(_id: any) {
    this.librosService.eliminarLibro(_id);

    window.location.reload()
  }

  /**
   * Método que coge el id del libro seleccionado y devuelve todos sus datos
   */
  consultar(_id: any) {
    this.libroSeleccionado = null;

    this.librosService.getLibro(_id).subscribe((data) => {
      this.libroSeleccionado = data;
    })
  }

}
