// Importaciones
import { Component, OnInit } from '@angular/core';
import { EventosService } from '../services/eventos.service';

@Component({
  selector: 'app-main-eventos',
  templateUrl: '../views/main-eventos.component.html',
  styleUrls: ['../../assets/css/main-eventos.component.css']
})
export class MainEventosComponent implements OnInit {

  // Declaraciones
  public eventos: any;
  public eventoSeleccionado: any;

  // Constructor
  constructor(private eventosService: EventosService) { }

  // Método que se lanza al iniciar el componente
  ngOnInit(): void {
    this.eventos = null;

    // Consulta a la base de datos
    this.eventosService.getAllEventos().subscribe((data: any) => {
      this.eventos = data;
      this.eventoSeleccionado = data
    })
  }

  /**
   * Método que selecciona un evento realizando una consulta a la 
   * base de datos por su id
   * @param _id 
   */
  seleccionaEvento(_id: any){
    this.eventoSeleccionado = null

    this.eventosService.getEvento(_id).subscribe((data: any) => {
      this.eventoSeleccionado = data
    })
  }

}