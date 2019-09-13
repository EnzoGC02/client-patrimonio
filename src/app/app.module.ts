import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {ReactiveFormsModule,FormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ElementosComponent } from './components/elementos/elementos.component';
import { ElementosListComponent } from './components/elementos/elementos-list/elementos-list.component';
import { PaginationComponent } from './components/elementos/elementos-list/pagination/pagination.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ElementosComponent,
    ElementosListComponent,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
