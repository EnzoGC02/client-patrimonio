import { Component, OnInit } from '@angular/core';
import { Elements } from '../../../models/elements'

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
    this.setElementsList()
    this.setBenefitsList()
  }



  public setElementsList(): void {
    this.elementsService.getElements(0)
      .subscribe(
        (data: Elements) => { //success
          this.ElementsList=[]
          this.ElementsList = data['elements'];
        },
        error => console.error(error), //error
        () => {
          console.log('end'); //end request
          this.setTotalPages()
          this.setElementsPaginated()
          this.showLinkAsActive()
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


    console.log(this.totalPages);
  }

  private setPages() {
    this.pages = [];
    for (var i = 0; i < this.totalPages; i++)
      this.pages[i] = i + 1;
    console.log(this.pages)
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

  private showLinkAsActive() {
    document.getElementById('ShowAll').classList.add('active')
    //document.getElementById('nav-home-tab').classList.remove('active');
  }

  updateElementsList(id) {
    //this.showLinkAsActive()
    this.elementsService.getElements(id)
      .subscribe(
        (data: Elements) => {
          this.ElementsList = data['elements']
        },
        error => console.log(error),
        () => {
          this.setTotalPages()
        }

      )
  }

  goToPage(numP: number) {
    this.numberPage = numP
  }
  private setElementsPaginated() {
    if (this.ElementsPaginated.length) {
      this.ElementsPaginated = [];
    }
    if (this.numberPage < this.totalPages) {
      var to = this.numberPage * 10       //hasta 
      var from = (to - 10)       //desde
      var i = 0
      for(from; from < to; to++) {
        this.ElementsPaginated[i] = this.ElementsList[from]
        i++;
      }
    }
  }

}
