// Importaciones
import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class EventosService {
  // Constructor
  constructor(private webReqService: WebRequestService) { }

  /**
   * Método que devuelve todos los eventos de la base de datos
   * @returns 
   */
  getAllEventos(){
    return this.webReqService.get('eventos');
  }

  /**
   * Método que devuelve un evento de la base de datos mediante su id
   * @param _id 
   * @returns 
   */
  getEvento(_id: any){
    return this.webReqService.get('eventos/' + _id)
  }

  /**
   * Método que inserta un evento a la base de datos
   * @param evento 
   */
  insertarEvento(evento: any){
    this.webReqService.postEvento(evento);
  }

  /**
   * Método que modifica un evento de la base de datos mediante
   * su id
   * @param _id 
   * @param evento 
   */
  modificarEvento(_id: any, evento: any){
    this.webReqService.putEvento(_id, evento);
  }

  /**
   * Método que elimina un evento de la base de datos mediante
   * su id
   * @param _id 
   */
  eliminarEvento(_id: any){
    this.webReqService.deleteEvento(_id);
  }
}
