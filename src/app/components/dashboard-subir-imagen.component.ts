// Importaciones
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-dashboard-subir-imagen',
  templateUrl: '../views/dashboard-subir-imagen.component.html',
  styleUrls: ['../../assets/css/dashboard-subir-imagen.component.css']
})
export class DashboardSubirImagenComponent implements OnInit {
  // Declaraciones
  public fileSeleccionado!: any;

  // Constructor
  constructor(private toastr: ToastrService,
    private uploadService: UploadService) { }

  // Método que se ejecuta al lanzar el componente
  ngOnInit(): void {
  }

  /**
   * Método que detecta si hay una imagen preparada para subir
   * @param event
   */
  selectImage(event: any){
    if (event.target.files.length > 0){
      const file = event.target.files[0];
      this.fileSeleccionado = file;
    }
  }

  /**
   * Método que se ejecuta al dar al submit en el formulario
   */
  onSubmit(){
    const formData = new FormData();
    formData.append('file', this.fileSeleccionado)

    this.uploadService.uploadFile(formData);
  }

}
