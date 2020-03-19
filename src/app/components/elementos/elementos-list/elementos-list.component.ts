import { Component, OnInit } from '@angular/core';
import { Elements } from '../../../models/elements'
import { FormsModule } from '@angular/forms'; 
import {SalidasFormComponent} from '../../salidas/salidas-form/salidas-form.component'

//services
import { ElementsService } from '../../../services/elements/elements.service'
import { Observable, BehaviorSubject } from 'rxjs';
import { Benefits } from 'src/app/models/benefits';
import { BenefitsService } from 'src/app/services/benefits/benefits.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-elementos-list',
  templateUrl: './elementos-list.component.html',
  styleUrls: ['./elementos-list.component.css']
})
export class ElementosListComponent implements OnInit {

  BenefitsList: Benefits[] = [];
  ElementsList: Elements[] = [];
  //Arreglo de elementos para usar en la paginacion
  ElementsPaginated: Elements[] = []


  //nav tags
  active: boolean
  indexActive:number

  //pagination
  pages: number[] = [];
  numberPage: number = 1
  totalPages: number;
  numElements: number
  numResults: number = 10

  constructor(
    private elementsService: ElementsService,
    private benefitsService: BenefitsService,
  ) {

  }
  ngOnInit() {
    this.setElementsList()
    this.setBenefitsList()
    this.active = true
  }



    //RECUPERACION Y ACTUALIZACION DE DATOS 
  public setElementsList(): void {
    this.elementsService.getElements()
      .subscribe(
        (data: Elements) => { //success
          this.ElementsList = []
          this.ElementsList = data['elements'];
          // console.log(this.ElementsList);
             

        },
        error => console.error(error), //error
        () => {
          console.log('end'); //end request
          this.setTotalPages()
          this.initilizeNumberPage()
          this.setElementsPaginated()
          this.showLinkAsActive('all')
        }
      )
  }
 public setBenefitsList() {
    this.benefitsService.getBenefits()
      .subscribe(
        (data: Benefits) => {
          this.BenefitsList = data['benefits'];
          console.log(this.BenefitsList);
          

        },
        error => console.error(error),
        ()=>{console.log("end request lista completa");
        }
      )
  }
  public updateElementsList(id) {
    this.showLinkAsActive(id)
    this.elementsService.getElementsForTypeBenefit(id)
      .subscribe(
        (data: Elements) => {
          this.ElementsList = data['elements']
        },
        error => console.log(error),

        () => { //end request
          this.setTotalPages()
          this.setElementsPaginated()
          this.initilizeNumberPage()
        }
      )
  }

  //METODOS QUE SE UTLIZAN PARA LA LOGICA DE LA VISTA
  private setTotalPages() {
    this.numElements = this.ElementsList.length
    let result = this.numElements / this.numResults
    this.totalPages = Math.round(result)

    //obtiene la parte decimal del resultado
    let partDecimal = result % 1
    //si la parte decimal es menor que 0,5 quiere decir que se requiere una pagina mas 
    if (partDecimal < 0.5) {
      this.totalPages++
    }

    this.setPages()


  }

  private setPages() {
    this.pages = [];
    for (var i = 0; i < this.totalPages; i++)
      this.pages[i] = i + 1;
  }
  

  private showLinkAsActive(id_action) {
    //recupera el elemento con la clase active actual
    var header=document.getElementsByClassName('nav-link active');
    //remueve la clase active del elemento que ya no debe mostrarse como active
    header[0].classList.remove('active');
    //recupera el elemento clickeado recientemente
    var current=document.getElementById(id_action)
    //agrega la clase de boostrap active
    current.classList.add('active');
  }


  goToPage(numP: number) {
    this.numberPage = numP
    this.setElementsPaginated()
  }

  private setElementsPaginated() {
    var to: number, from: number
    this.ElementsPaginated = [];

    if (this.numberPage < this.totalPages) {
      to = this.numberPage * 10       //hasta 
      from = (to - 10)       //desde
    }
    else if (this.numberPage == this.totalPages) {
      from = (this.numberPage * 10) - 10
      to = this.ElementsList.length
    }
    this.ElementsPaginated = this.ElementsList.slice(from, to)

  }
  private initilizeNumberPage() {
    this.numberPage = 1
  }
  public getElementIndex(i){
    if(this.numberPage==1){
      return i;
    }
    else (this.numberPage>1)
      return i+(this.numberPage-1)*10;
  }

}
