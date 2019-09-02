import { Component, OnInit } from '@angular/core';
import { Elements } from '../../../models/elements'

//services
import { ElementsService } from '../../../services/elements/elements.service'
import { Observable, BehaviorSubject } from 'rxjs';
import { Benefits } from 'src/app/models/benefits';
import { BenefitsService } from 'src/app/services/benefits/benefits.service';

@Component({
  selector: 'app-elementos-list',
  templateUrl: './elementos-list.component.html',
  styleUrls: ['./elementos-list.component.css']
})
export class ElementosListComponent implements OnInit {

  ElementsList: Elements[] = [];
  BenefitsList: Benefits[] = [];

  constructor(
    private elementsService: ElementsService,
    private benefitsService: BenefitsService
  ) {

  }
  ngOnInit() {
    this.setElementsList()
    this.setBenefitsList()
  }



  setElementsList() {
    this.elementsService.getElements(0  )
      .subscribe(
        (data: Elements) => { //success
          this.ElementsList = data['elements'];
          console.log(this.ElementsList);

        },
        error => console.error(error), //error
        () => {
          console.log('end'); //end request
        }

      )

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
          console.log(this.BenefitsList);
          
        },
        error => console.error(error)
      )
  }

  showLinkAsActive() {
    var aes = document.getElementsByName('nav-home-tab');
    for (var i = 0; i < aes.length; i++) {
      if (aes[i].classList.contains('active'))
        aes[i].classList.remove('active')
    }
  }
  updateElementsList(id) {
    this.showLinkAsActive()
    console.log(id);
    this.elementsService.getElements(id)
    .subscribe(
      (data:Elements)=>{
        this.ElementsList=data['elements']
        console.log(this.ElementsList);
        
      }
    )
  }




}
