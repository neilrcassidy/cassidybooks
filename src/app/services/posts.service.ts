// Importaciones
import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  // Constructor
  constructor(private webReqService: WebRequestService) { }

  /**
   * Método que devuelve todos los posts de la base de datos
   * @returns 
   */
  getAllPosts(){
    return this.webReqService.get('posts');
  }

  /**
   * Método que devuelve un post de la base de datos mediante su id
   * @param _id 
   * @returns 
   */
  getPost(_id: any){
    return this.webReqService.get('posts/' + _id)
  }

  /**
   * Método que inserta un post a la base de datos
   * @param evento 
   */
  insertarBlogPost(post: any){
    this.webReqService.postBlogPost(post);
  }

  /**
   * Método que modifica un post de la base de datos mediante
   * su id
   * @param _id 
   * @param evento 
   */
  modificarBlogPost(_id: any, post: any){
    this.webReqService.putBlogPost(_id, post);
  }

  /**
   * Método que elimina un post de la base de datos mediante
   * su id
   * @param _id 
   */
  eliminarBlogPost(_id: any){
    this.webReqService.deleteBlogPost(_id);
  }
}
