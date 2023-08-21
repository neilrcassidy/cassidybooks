// Importaciones
import { Component, OnInit } from '@angular/core';
import { EventosService } from '../services/eventos.service';
import { faInfoCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-eventos',
  templateUrl: '../views/dashboard-eventos.component.html',
  styleUrls: ['../../assets/css/dashboard-eventos.component.css']
})

export class DashboardEventosComponent implements OnInit {
  // Declaraciones
  public eventos: any
  public eventoSeleccionado: any;
  public logoInfo = faInfoCircle
  public logoModificar = faEdit
  public logoEliminar = faTrashAlt
  public formInsertar!: FormGroup
  public formModificar!: FormGroup

  // Constructor
  constructor(private formBuilder: FormBuilder, 
    private eventosService: EventosService,
    private toastr: ToastrService) { }

  // Método que se ejecuta al lanzar el componente
  ngOnInit(): void {
    // Consulta a la base de datos
    this.eventosService.getAllEventos().subscribe((data) => {
      this.eventos = data;
      this.eventoSeleccionado = data;
    })

    // Construcción del formulario de insertar
    this.formInsertar = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.min(1)]],
      fecha: ['', [Validators.required, Validators.min(1)]],
      ubicacion: ['', [Validators.required, Validators.min(1)]],
      descripcion: ['', [Validators.required, Validators.min(1)]],
      organizacion: ['', [Validators.required, Validators.min(1)]],
      imagen: ['']
    });

    // Construcción del formulario de modificar
    this.formModificar = this.formBuilder.group({
      ID: ['', [Validators.required, Validators.min(1)]],
      nombre: ['', [Validators.required, Validators.min(1)]],
      fecha: ['', [Validators.required, Validators.min(1)]],
      ubicacion: ['', [Validators.required, Validators.min(1)]],
      descripcion: ['', [Validators.required, Validators.min(1)]],
      organizacion: ['', [Validators.required, Validators.min(1)]],
      imagen: ['']
    });
  }

  /**
   * Método que coge los datos del formulario de insertar y lo inserta en la base de datos
   */
  insertar(){
    if(this.formInsertar.valid){
      const evento: any = {
        nombre: this.formInsertar.value.nombre,
        fecha: this.formInsertar.value.fecha,
        ubicacion: this.formInsertar.value.ubicacion,
        descripcion: this.formInsertar.value.descripcion,
        organizacion: this.formInsertar.value.organizacion,
        imagen: this.formInsertar.value.imagen
      }

      this.eventosService.insertarEvento(evento)

      window.location.reload()
    } else {
      this.toastr.error('Falta algun campo por rellenar', '¡Cuidado!', {positionClass: 'toast-bottom-right'})
    }
  }

  /**
   * Método que rellena el formulario de modificar con datos del libro seleccionado
   * @param _id 
   */
  rellenaFormulario(_id: any){
    this.eventoSeleccionado = null;

    this.eventosService.getEvento(_id).subscribe((data) => {
      this.eventoSeleccionado = data;

      this.formModificar.setValue({
        ID: this.eventoSeleccionado._id,
        nombre: this.eventoSeleccionado.nombre,
        fecha: this.eventoSeleccionado.fecha,
        ubicacion:  this.eventoSeleccionado.ubicacion,
        descripcion: this.eventoSeleccionado.descripcion,
        organizacion: this.eventoSeleccionado.organizacion,
        imagen: this.eventoSeleccionado.imagen
      })
    })
  }

  /**
   * Método que coge los datos del formulario de modificar y lo inserta en la base de datos
   */
  modificar(){
    if(this.formModificar.valid){
      const evento: any = {
        nombre: this.formModificar.value.nombre,
        fecha: this.formModificar.value.fecha,
        ubicacion: this.formModificar.value.ubicacion,
        descripcion: this.formModificar.value.descripcion,
        organizacion: this.formModificar.value.organizacion,
        imagen: this.formModificar.value.imagen
      }

      this.eventosService.modificarEvento(this.formModificar.value.ID, evento)

      window.location.reload()
    } else {
      this.toastr.error('Falta algun campo por rellenar', '¡Cuidado!', {positionClass: 'toast-bottom-right'})
    }
  }

  /**
   * Método que coge el id del evento seleccionado y lo elimina de la base de datos
   */
  eliminar(_id: any) {
    this.eventosService.eliminarEvento(_id);

    window.location.reload()
  }

  /**
   * Método que coge el id del evento seleccionado y devuelve todos sus datos
   */
  consultar(_id: any){
    this.eventoSeleccionado = null;

    this.eventosService.getEvento(_id).subscribe((data) => {
      this.eventoSeleccionado = data;
    })
  }

}
