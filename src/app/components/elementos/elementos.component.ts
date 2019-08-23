import { Component, OnInit } from '@angular/core';

//services
import {BenefitsService} from '../../services/benefits.service'

//modelos
import {Benefits} from '../../models/benefits'

@Component({
  selector: 'app-elementos',
  templateUrl: './elementos.component.html',
  styleUrls: ['./elementos.component.css']
})
export class ElementosComponent implements OnInit {

  benefitsList:Benefits[]=[];


  constructor(
    private benefitsService:BenefitsService
  ) { }

  ngOnInit() {
    this.setBenefitsList();
  }

  setBenefitsList(){
    this.benefitsService.getBenefits()
      .subscribe(
        (data:Benefits)=>{ //success
          this.benefitsList=data['benefits'];
          console.log(this.benefitsList);
        }
      )
    }

  

}
