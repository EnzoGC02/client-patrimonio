import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {ReactiveFormsModule,FormsModule} from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { RouterModule,Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ElementosComponent } from './components/elementos/elementos.component';
import { ElementosListComponent } from './components/elementos/elementos-list/elementos-list.component';
import { PaginationComponent } from './components/elementos/elementos-list/pagination/pagination.component';
import { SalidasListComponent } from './components/salidas/salidas-list/salidas-list.component';
import { SalidasFormComponent } from './components/salidas/salidas-form/salidas-form.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ElementosComponent,
    ElementosListComponent,
    PaginationComponent,
    SalidasListComponent,
    SalidasFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
