// Importaciones
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { faInfoCircle, faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard-posts',
  templateUrl: '../views/dashboard-posts.component.html',
  styleUrls: ['../../assets/css/dashboard-posts.component.css']
})
export class DashboardPostsComponent implements OnInit {
  // Declaraciones
  public posts: any
  public postSeleccionado: any
  public logoInfo = faInfoCircle
  public logoModificar = faEdit
  public logoEliminar = faTrashAlt
  public formInsertar!: FormGroup
  public formModificar!: FormGroup

  // Constructor
  constructor(private formBuilder: FormBuilder, 
    private postsService: PostsService,
    private toastr: ToastrService) { }

  // Método que se ejecuta al lanzar el componente
  ngOnInit(): void {
    // Consulta a la base de datos
    this.postsService.getAllPosts().subscribe((data) => {
      this.posts = data;
      this.postSeleccionado = data;
    })

    // Construcción del formulario de insertar
    this.formInsertar = this.formBuilder.group({
      titulo:['', [Validators.required, Validators.min(1)]],
      autor: ['', [Validators.required, Validators.min(1)]],
      texto: ['', [Validators.required, Validators.min(1)]],
      fecha: ['', [Validators.required, Validators.min(1)]],
      imagen: ['']
    });

    // Construcción del formulario de modificar
    this.formModificar = this.formBuilder.group({
      ID: ['', [Validators.required, Validators.min(1)]],
      titulo:['', [Validators.required, Validators.min(1)]],
      autor: ['', [Validators.required, Validators.min(1)]],
      texto: ['', [Validators.required, Validators.min(1)]],
      fecha: ['', [Validators.required, Validators.min(1)]],
      imagen: ['']
    });
  }

  /**
   * Método que coge los datos del formulario de insertar y lo inserta en la base de datos
   */
  insertar() {
    if(this.formInsertar.valid){
      const post: any = {
        titulo: this.formInsertar.value.titulo,
        autor: this.formInsertar.value.autor,
        texto: this.formInsertar.value.texto,
        fecha: this.formInsertar.value.fecha,
        imagen: this.formInsertar.value.imagen
      }

      this.postsService.insertarBlogPost(post)

      window.location.reload()
    } else {
      this.toastr.error('Falta algun campo por rellenar', '¡Cuidado!', {positionClass: 'toast-bottom-right'})
    } 
  }

  /**
   * Método que rellena el formulario de modificar con datos del post seleccionado
   * @param _id 
   */
  rellenaFormulario(_id: any) {
    this.postSeleccionado = null;

    this.postsService.getPost(_id).subscribe((data) => {
      this.postSeleccionado = data;

      this.formModificar.setValue({
        ID: this.postSeleccionado._id,
        titulo: this.postSeleccionado.titulo,
        autor: this.postSeleccionado.autor,
        texto: this.postSeleccionado.texto,
        fecha: this.postSeleccionado.fecha,
        imagen: this.postSeleccionado.imagen
      })
    })

  }

  /**
   * Método que coge los datos del formulario de modificar y lo inserta en la base de datos
   */
  modificar() {
    if(this.formModificar.valid){
      const post: any = {
        titulo: this.formModificar.value.titulo,
        autor: this.formModificar.value.autor,
        texto: this.formModificar.value.texto,
        fecha: this.formModificar.value.fecha,
        imagen: this.formModificar.value.imagen
      }

      this.postsService.modificarBlogPost(this.formModificar.value.ID, post);

      window.location.reload()
    } else {
      this.toastr.error('Falta algun campo por rellenar', '¡Cuidado!', {positionClass: 'toast-bottom-right'})
    }
  }

  /**
   * Método que coge el id del post seleccionado y lo elimina de la base de datos
   */
  eliminar(_id: any) {
    this.postsService.eliminarBlogPost(_id);

    window.location.reload()
  }

  /**
   * Método que coge el id del post seleccionado y devuelve todos sus datos
   */
  consultar(_id: any) {
    this.postSeleccionado = null;

    this.postsService.getPost(_id).subscribe((data) => {
      this.postSeleccionado = data;
    })
  }

}
