// Importaciones
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http'
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WebRequestService {

  // Declaraciones
  readonly ROOT_URL;

  // Constructor
  constructor(private http: HttpClient,
    private toastr: ToastrService) {
    this.ROOT_URL = '/api';
  }

  /**
   * Método general de GET
   * @param uri
   * @returns 
   */
  get(uri: String){
    return this.http.get(this.ROOT_URL + "/" + uri);
  }

  /**
   * Método POST para libros
   * @param libro 
   * @returns 
   */
  postLibro(libro: any){
    let _isbn = libro.ISBN
    let titulo = libro.titulo
    let autor = libro.autor
    let editorial = libro.editorial
    let fecha = libro.fecha
    let edicion = libro.edicion
    let genero = libro.genero
    let precio = libro.precio
    let descuento = libro.descuento
    let tipo = libro.tipo
    let stock = libro.stock
    let portada = libro.portada

    return this.http.post(this.ROOT_URL + "/libros", {
      _isbn,
      titulo,
      autor,
      editorial,
      fecha,
      edicion,
      genero,
      precio,
      descuento,
      tipo,
      stock,
      portada
    },
    {
      observe: 'response'
    }).subscribe()
  }

  /**
   * Método PUT para libros
   * @param id 
   * @param libro 
   * @returns 
   */
  putLibro(id: String, libro: any){
    let _isbn = libro.ISBN
    let titulo = libro.titulo
    let autor = libro.autor
    let editorial = libro.editorial
    let fecha = libro.fecha
    let edicion = libro.edicion
    let genero = libro.genero
    let precio = libro.precio
    let descuento = libro.descuento
    let tipo = libro.tipo
    let stock = libro.stock
    let portada = libro.portada

    return this.http.put(this.ROOT_URL + "/libros/" + id, {
      _isbn,
      titulo,
      autor,
      editorial,
      fecha,
      edicion,
      genero,
      precio,
      descuento,
      tipo,
      stock,
      portada
    },
    {
      observe: 'response'
    }).subscribe()
  }

  /**
   * Método DELETE para libros
   * @param id 
   * @returns 
   */
  deleteLibro(id: String){
    return this.http.delete(this.ROOT_URL + "/libros/" + id).subscribe()
  }

  /**
   * Método POST para eventos
   * @param evento 
   * @returns 
   */
  postEvento(evento: any){
    let nombre = evento.nombre
    let fecha = evento.fecha
    let ubicacion = evento.ubicacion
    let descripcion = evento.descripcion
    let organizacion = evento.organizacion
    let imagen = evento.imagen

    return this.http.post(this.ROOT_URL + "/eventos", {
      nombre,
      fecha,
      ubicacion,
      descripcion,
      organizacion,
      imagen
    },
    {
      observe: 'response'
    }).subscribe()
  }

  /**
   * Método PUT para eventos
   * @param id 
   * @param evento 
   * @returns 
   */
  putEvento(id: String, evento: any){
    let nombre = evento.nombre
    let fecha = evento.fecha
    let ubicacion = evento.ubicacion
    let descripcion = evento.descripcion
    let organizacion = evento.organizacion
    let imagen = evento.imagen

    return this.http.put(this.ROOT_URL + "/eventos/" + id, {
      nombre,
      fecha,
      ubicacion,
      descripcion,
      organizacion,
      imagen
    },
    {
      observe: 'response'
    }).subscribe()
  }

  /**
   * Método DELETE para eventos
   * @param id 
   * @returns 
   */
  deleteEvento(id: String){
    return this.http.delete(this.ROOT_URL + "/eventos/" + id).subscribe()
  }

  /**
   * Método POST para posts
   * @param post 
   * @returns 
   */
  postBlogPost(post: any){
    let titulo = post.titulo
    let autor = post.autor
    let texto = post.texto
    let fecha = post.fecha
    let imagen = post.imagen

    return this.http.post(this.ROOT_URL + "/posts", {
      titulo,
      autor,
      texto,
      fecha,
      imagen
    },
    {
      observe: 'response'
    }).subscribe()
  }

  /**
   * Método PUT para posts
   * @param id 
   * @param post 
   * @returns 
   */
  putBlogPost(id: String, post: any){
    let titulo = post.titulo
    let autor = post.autor
    let texto = post.texto
    let fecha = post.fecha
    let imagen = post.imagen

    return this.http.put(this.ROOT_URL + "/posts/" + id, {
      titulo,
      autor,
      texto,
      fecha,
      imagen
    },
    {
      observe: 'response'
    }).subscribe()
  }

  /**
   * Método DELETE para posts
   * @param id 
   * @returns 
   */
  deleteBlogPost(id: String){
    return this.http.delete(this.ROOT_URL + "/posts/" + id).subscribe()
  }
  
  /**
   * Método POST para iniciar sesión
   * @param email 
   * @param password 
   * @returns 
   */
  login(email: String, password: String) {
    return this.http.post(this.ROOT_URL + "/users/login", {
      email,
      password
    },
    {
      observe: 'response'
    })
  }

  /**
   * Método POST para registrar 
   * @param email 
   * @param password 
   * @returns 
   */
  registrar(email: String, password: String) {
    return this.http.post(this.ROOT_URL + "/users", {
      email,
      password
    },
    {
      observe: 'response'
    })
  }

  /**
   * Método PUT para editar el carrito
   * @param _id 
   * @returns 
   */
  putInCarrito(_id: any){
    const accessToken = String(localStorage.getItem('x-access-token'));
    console.log(accessToken)

    return this.http.put(this.ROOT_URL + "/carrito/librosById/" + _id, {}, {
      headers: {'x-access-token': accessToken},
      observe: 'response'
    }).subscribe()
  }

  /**
   * Método DELETE para borrar libros del carrito
   * @param _id 
   * @returns 
   */
  deleteFromCarrito(_id: any){
    const accessToken = String(localStorage.getItem('x-access-token'));
    console.log(accessToken)

    return this.http.delete(this.ROOT_URL + "/carrito/librosById/" + _id, {
      headers: {'x-access-token': accessToken},
      observe: 'response'
    }).subscribe()
  }

  /**
   * Método GET para el carrito
   * @param uri 
   * @returns 
   */
  getCarrito(uri: String){
    return this.http.get(this.ROOT_URL + "/" + uri);
  }

  /**
   * Método POST para crear un carrito
   * @param accesstoken 
   * @returns 
   */
  createCarrito(accesstoken: String) {
    return this.http.post(this.ROOT_URL + "/carrito", {}, {
      headers: {'x-access-token': String(accesstoken)},
      observe: 'response'
    });
  }

  /**
   * Método POST para subir un archivo
   * @param formData 
   */
  postFile(formData: any){
    this.http.post(this.ROOT_URL + "/file", formData).subscribe((res) => {
      if(res){
        this.toastr.success('¡Imagen subido con éxito! No te olvides del nombre del archivo, lo necesitarás para insertar un libro', '¡Vamos!', { positionClass: 'toast-bottom-right' })
      }
    })
  }
}
