import { Component, OnInit } from '@angular/core';
import {Elements} from '../../../models/elements'

//services
import {ElementsService} from '../../../services/elements/elements.service'
import { Observable } from 'rxjs';

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
      (data:Elements)=>{ //success
        this.ElementsList=data['elements'];
        console.log(this.ElementsList);
        
      },
      error=>console.error(error), //error
      ()=>{console.log('end'); //end request
      }
      
    )
    
  }

  editElement(id)
  {
    console.log(id);
    
  }
  deletElement(id){
    console.log(id);
    
  } 



}
