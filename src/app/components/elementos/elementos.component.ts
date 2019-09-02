import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {Router} from '@angular/router'

//services
import {BenefitsService} from '../../services/benefits/benefits.service'
import {CategorysService} from '../../services/categorys/categorys.service'
import {ElementsService} from '../../services/elements/elements.service'

//modelos
import {Benefits} from '../../models/benefits'
import {Elements} from '../../models/elements'
import {Categorys} from '../../models/categorys'

@Component({
  selector: 'app-elementos',
  templateUrl: './elementos.component.html',
  styleUrls: ['./elementos.component.css']
})
export class ElementosComponent implements OnInit {


  /*****VARIABLES LOCALES*****/
  benefitsList:Benefits[]=[];
  ElementsList:Elements[];
  categorysList:Categorys[]=[];

  elementForm:FormGroup;
  element:Elements=new Elements(0);
  id_benef:number
  enabledSelectCategory:boolean=false;


  constructor(
    private benefitsService:BenefitsService,
    private categorysService:CategorysService,
    private elementsService:ElementsService,
    private router:Router
  ) {
      this.elementForm=this.createFormGroupElements();
      console.log(this.element);
    }

  ngOnInit() {
    this.setBenefitsList();
  }


  //Creacion de instancia formgroup y get de elementos
  createFormGroupElements(){
    return new FormGroup({
      TypeBenefit:new FormControl('',Validators.required),
      Category:new FormControl('',Validators.required),
      nameElement:new FormControl('',[Validators.required,Validators.minLength(4)]),
      descriptionElement:new FormControl('',[Validators.required,Validators.minLength(8)]),
      quantityElement: new FormControl('',Validators.required)

    });
  }

  get TypeBenefit(){
    return this.elementForm.get('TypeBenefit');
  }
  get Category(){
    return this.elementForm.get('Category');
  }
  get nameElement(){
    return this.elementForm.get('nameElement');
  }
  get descriptionElement(){
    return this.elementForm.get('descriptionElement');
  }
  get quantityElement(){
    return this.elementForm.get('quantityElement');
  }


  

   /*****METODOS*****/
  private setBenefitsList(){
    this.benefitsService.getBenefits()
      .subscribe(
        (data:Benefits)=>{ //success
          this.benefitsList=data['benefits'];
        }
      )
    }

  //se llama en la vista
  setCategorysList(){
    //console.log(this.id_benef)
    this.categorysService.getCategoryForBenefyt(this.id_benef)
    .subscribe(
      (data:Categorys)=>{ //success
        console.log(data);
        this.categorysList=data['categorys'];
        console.log(this.categorysList);

      },
      err => console.error('Observer got an error: ' + err),
      () => { // end request
        console.log('Observer got a complete notification')
        this.enabledSelectCategory=true

      }
    )
  }

  saveNewElement(){
    this.elementsService.saveElement(this.element)
    .subscribe(
      data=>console.log(data),
      error=>console.error(error),
      ()=>{
        
        this.router.navigate(['elementos/list'])
      }
    )
  
    }
  }

