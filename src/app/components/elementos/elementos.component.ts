import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router'

//services
import { BenefitsService } from '../../services/benefits/benefits.service'
import { CategorysService } from '../../services/categorys/categorys.service'
import { ElementsService } from '../../services/elements/elements.service'

//modelos
import { Benefits } from '../../models/benefits'
import { Elements } from '../../models/elements'
import { Categorys } from '../../models/categorys'

@Component({
  selector: 'app-elementos',
  templateUrl: './elementos.component.html',
  styleUrls: ['./elementos.component.css']
})
export class ElementosComponent implements OnInit {


  /*****VARIABLES LOCALES*****/
  benefitsList: Benefits[] = [];
  ElementsList: Elements[];
  categorysList: Categorys[] = [];

  elementForm: FormGroup;
  element: Elements = new Elements(0);
  id_benef: number
  enabledSelectCategory: boolean = false;
  message: string;


  constructor(
    private benefitsService: BenefitsService,
    private categorysService: CategorysService,
    private elementsService: ElementsService,
    private router: Router
  ) {
    this.elementForm = this.createFormGroupElements();
  }

  ngOnInit() {
    this.setBenefitsList();
  }


  //Creacion de instancia formgroup y get de elementos
  createFormGroupElements() {
    return new FormGroup({
      TypeBenefit: new FormControl('', Validators.required),
      Category: new FormControl('', Validators.required),
      nameElement: new FormControl('', [Validators.required, Validators.minLength(4)]),
      descriptionElement: new FormControl('', [Validators.required, Validators.minLength(8)]),
      quantityElement: new FormControl('', Validators.required)

    });
  }

  get TypeBenefit() {
    return this.elementForm.get('TypeBenefit');
  }
  get Category() {
    return this.elementForm.get('Category');
  }
  get nameElement() {
    return this.elementForm.get('nameElement');
  }
  get descriptionElement() {
    return this.elementForm.get('descriptionElement');
  }
  get quantityElement() {
    return this.elementForm.get('quantityElement');
  }




  /*****METODOS*****/
  private setBenefitsList() {
    this.benefitsService.getBenefits()
      .subscribe(
        (data: Benefits) => { //success
          this.benefitsList = data['benefits'];
        }
      )
  }

  //se llama en la vista
  setCategorysList() {

    //console.log(this.id_benef)
    this.categorysService.getCategoryForBenefyt(this.id_benef)
      .subscribe(
        (data: Categorys) => { //success
          console.log(data);
          this.categorysList = data['categorys'];
          console.log(this.categorysList);

        },
        err => console.error('Observer got an error: ' + err),
        () => { // end request
          console.log('Observer got a complete notification')
          this.enabledSelectCategory = true

        }
      )
  }

  saveNewElement() {
    this.elementsService.saveElement(this.element)
      .subscribe(
        data => {
          console.log(data)
          this.message = data['message']
        },
        error => console.error(error),
        () => {

          this.showAlert()
        }
      )

  }

  showAlert() {
    var alert = document.getElementById('alertMsg')
    alert.classList.add('alert')
    document.getElementById('form').classList.add('d-none')
    if (this.message == 'saved') {
      if(alert.classList.contains('alert-danger')){
         alert.classList.remove('alert-danger')
      }
      alert.classList.add('alert-success')
      alert.innerHTML = "<p class=\"lead alert-success\"> El elemento fue guardado con exito <a href=\"/elementos/list\">click aqui</a> para consultar lista de elementos</p>";
    }
    else if(this.message=='error'){
      if(alert.classList.contains('alert-success')){
        alert.classList.remove('alert-success')
      }
      alert.classList.add('alert-danger')
      alert.innerHTML = "<p class=\"lead alert-danger\"> El elemento no pudo ser guardado <a href=\"/elementos/list\">click aqui</a> para intentar otra vez</p>";

    }
    //return false
  }
}

