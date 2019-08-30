import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http'
import {ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ElementosComponent } from './components/elementos/elementos.component';
import { ElementosListComponent } from './components/elementos/elementos-list/elementos-list.component';
import { Observable } from 'rxjs/Rx';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ElementosComponent,
    ElementosListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
