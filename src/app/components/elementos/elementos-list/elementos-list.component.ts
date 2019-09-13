import { Component, OnInit } from '@angular/core';
import { Elements } from '../../../models/elements'
import { FormsModule } from '@angular/forms'; 

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
    private benefitsService: BenefitsService
  ) {

  }
  ngOnInit() {
    this.setElementsList(true)
    this.setBenefitsList()
    this.active = true
  }



  public setElementsList(init = false): void {
    this.elementsService.getElements(0)
      .subscribe(
        (data: Elements) => { //success
          this.ElementsList = []
          this.ElementsList = data['elements'];

        },
        error => console.error(error), //error
        () => {
          console.log('end'); //end request
          this.setTotalPages()
          this.initilizeNumberPage()
          this.setElementsPaginated()

          if (init == false)
            this.showLinkAsActive(0)
        }
      )
  }
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

  editElement(id) {
    console.log(id);

  }
  deletElement(id) {
    console.log(id);

  }
  setBenefitsList() {
    this.benefitsService.getBenefits()
      .subscribe(
        (data: Benefits) => {
          this.BenefitsList = data['benefits']

        },
        error => console.error(error)
      )
  }

  private showLinkAsActive(indexActive=0) {
    var header = document.getElementById("nav-tab");
    var item = header.getElementsByClassName('nav-link')
    var current = header.getElementsByClassName("nav-link active");
    current[0].className = current[0].className.replace(" active", "")
    //agrega la clase active al elemento seleccionado
    
    console.log(item);
    console.log(current);

    //item[page].className+=" active"
  }

  updateElementsList(id) {
    //this.showLinkAsActive()
    this.elementsService.getElements(id)
      .subscribe(
        (data: Elements) => {
          this.ElementsList = data['elements']
        },
        error => console.log(error),

        () => { //end request
          this.setTotalPages()
          this.setElementsPaginated()
          this.initilizeNumberPage()
          this.showLinkAsActive()
        }
      )
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

}
