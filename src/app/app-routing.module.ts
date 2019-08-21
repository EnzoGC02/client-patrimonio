import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ElementosComponent} from './components/elementos/elementos.component'


const routes: Routes = [
  {
    path:'elementos/add',
    component:ElementosComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
