import { Component, OnInit } from '@angular/core';
import {Elements} from '../../../models/elements'

//services
import {ElementsService} from '../../../services/elements/elements.service'

@Component({
  selector: 'app-elementos-list',
  templateUrl: './elementos-list.component.html',
  styleUrls: ['./elementos-list.component.css']
})
export class ElementosListComponent implements OnInit {

   ElementsList:Elements[]=[];


  constructor(
    private elementsService:ElementsService
  ) {

   }
  ngOnInit() {
    this.setElementsList()
  }
 

  setElementsList(){
    this.elementsService.getElements()
    .subscribe(
      (data)=>{
        this.ElementsList=data['elements'];
        console.log(this.ElementsList)
      }
    )
  }

}
