import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';
import { MainComponent } from './components/main.component';
import { MainInicioComponent } from './components/main-inicio.component';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { MainLibrosComponent } from './components/main-libros.component';
import { MainEventosComponent } from './components/main-eventos.component';
import { MainBlogComponent } from './components/main-blog.component';
import { MainLoginComponent } from './components/main-login.component';
import { MainRegistrarComponent } from './components/main-registrar.component';
import { MainCarritoComponent } from './components/main-carrito.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebRequestInterceptorService } from './services/web-request.interceptor';
import { DashboardComponent } from './components/dashboard.component';
import { DashboardLibrosComponent } from './components/dashboard-libros.component';
import { DashboardEventosComponent } from './components/dashboard-eventos.component';
import { DashboardPostsComponent } from './components/dashboard-posts.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { DashboardSubirImagenComponent } from './components/dashboard-subir-imagen.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    MainInicioComponent,
    PageNotFoundComponent,
    MainLibrosComponent,
    MainEventosComponent,
    MainBlogComponent,
    MainLoginComponent,
    MainRegistrarComponent,
    MainCarritoComponent,
    DashboardComponent,
    DashboardLibrosComponent,
    DashboardEventosComponent,
    DashboardPostsComponent,
    DashboardSubirImagenComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: WebRequestInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
