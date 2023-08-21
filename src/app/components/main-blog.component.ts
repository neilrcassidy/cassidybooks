// Importaciones
import { Component, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-main-blog',
  templateUrl: '../views/main-blog.component.html',
  styleUrls: ['../../assets/css/main-blog.component.css']
})
export class MainBlogComponent implements OnInit {
  // Declaraciones
  public posts: any;
  public postSeleccionado: any;

  // Constructor
  constructor(private postsService: PostsService) { }

  // Método que se ejecuta al lanzar el componente 
  ngOnInit(): void {
    this.posts = null;

    // Consulta a la base de datos
    this.postsService.getAllPosts().subscribe((data: any) => {
      this.posts = data;
      this.postSeleccionado = data
    })
  }

  /**
   * Método que selecciona un post pasando su id
   * @param _id
   */
  seleccionaPost(_id: any){
    this.postSeleccionado = null

    this.postsService.getPost(_id).subscribe((data: any) => {
      this.postSeleccionado = data
    })
  }

}
