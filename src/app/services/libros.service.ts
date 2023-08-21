// Importaciones
import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class LibrosService {
  // Constructor
  constructor(private webReqService: WebRequestService) { }

  /**
   * Método que devuelve todos los libros de la base de datos
   * @returns 
   */
  getAllLibros(){
    return this.webReqService.get('libros');
  }

  /**
   * Método que devuelve todos los libros fisicos de la base de datos
   * @returns 
   */
  getLibrosFisico(){
    return this.webReqService.get('libros/tipo/fisico')
  }

  /**
   * Método que devuelve todos los libros ebook de la base de datos
   * @returns 
   */
  getLibrosEbook(){
    return this.webReqService.get('libros/tipo/ebook')
  }

  /**
   * Método que devuelve todos los libros audio de la base de datos
   * @returns 
   */
  getLibrosAudio(){
    return this.webReqService.get('libros/tipo/audio')
  }

  /**
   * Método que devuelve libros de la base de datos por parte del titulo
   * @returns 
   */
  getLibroByTitulo(titulo: string){
    return this.webReqService.get('libros/titulo/' + titulo)
  }

  /**
   * Método que devuelve libros de la base de datos que están en
   * descuento
   * @returns 
   */
  getLibrosConDescuento(){
    return this.webReqService.get('libros/descuento/0')
  }

  /**
   * Método que devuelve libros en un cierto carrito
   * @returns 
   */
  getLibrosInCarrito(){
    return this.webReqService.get('carrito/libros')
  }

  /**
   * Método que devuelve un libro por su id
   * @param _id 
   * @returns 
   */
  getLibro(_id: any){
    return this.webReqService.get('libros/' + _id)
  }

  /**
   * Método que inserta un libro en la base de datos
   * @param libro 
   */
  insertarLibro(libro: any){
    this.webReqService.postLibro(libro);
  }

  /**
   * Método que modicia un libro en la base de datos
   * @param _id 
   * @param libro 
   */
  modificarLibro(_id: any, libro: any){
    this.webReqService.putLibro(_id, libro);
  }

  /**
   * Método que elimina un libro de la base de datos
   * @param _id 
   */
  eliminarLibro(_id: any){
    this.webReqService.deleteLibro(_id);
  }

  /**
   * Método que agrega un libro al carrito
   * @param _id 
   */
  addToCarrito(_id: any){
    this.webReqService.putInCarrito(_id);
  }

  /**
   * Método que elimina un libro del carrito
   * @param _id 
   */
  removeFromCarrito(_id: any){
    this.webReqService.deleteFromCarrito(_id);
  }
}
