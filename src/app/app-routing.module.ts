// Importaciones
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard.component';
import { MainBlogComponent } from './components/main-blog.component';
import { MainCarritoComponent } from './components/main-carrito.component';
import { MainEventosComponent } from './components/main-eventos.component';
import { MainInicioComponent } from './components/main-inicio.component';
import { MainLibrosComponent } from './components/main-libros.component';
import { MainLoginComponent } from './components/main-login.component';
import { MainRegistrarComponent } from './components/main-registrar.component';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { DashboardEventosComponent } from './components/dashboard-eventos.component';
import { DashboardLibrosComponent } from './components/dashboard-libros.component';
import { DashboardPostsComponent } from './components/dashboard-posts.component';
import { DashboardSubirImagenComponent } from './components/dashboard-subir-imagen.component';

// Definición de las rutas
const routes: Routes = [
  { path: 'libros', component: MainLibrosComponent },
  { path: 'libros/:filtroConsulta', component: MainLibrosComponent },
  { path: 'eventos', component: MainEventosComponent },
  { path: 'blog', component: MainBlogComponent},
  { path: 'login', component: MainLoginComponent},
  { path: 'registrar', component: MainRegistrarComponent},
  { path: 'carrito', component: MainCarritoComponent},
  { 
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      { path: 'libros', component: DashboardLibrosComponent },
      { path: 'eventos', component: DashboardEventosComponent },
      { path: 'posts', component: DashboardPostsComponent },
      { path: 'subirimagen', component: DashboardSubirImagenComponent }
  ]},
  { path: 'inicio', component: MainInicioComponent },
  { path: '', component: MainInicioComponent },
  // El de error siempre el último
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
