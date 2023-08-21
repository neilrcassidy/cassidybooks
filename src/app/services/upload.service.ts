// Importaciones
import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  // Constructor
  constructor(private webReqService: WebRequestService) {}

  /**
   * Método que sube un archivo a la carpeta de uploads
   * @param formData 
   */
  uploadFile(formData: any){
    this.webReqService.postFile(formData);
  }
}
