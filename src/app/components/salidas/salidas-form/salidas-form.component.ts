import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Elements } from '../../../models/elements'

import { ElementsService } from '../../../services/elements/elements.service'
import { fromEventPattern } from 'rxjs';

@Component({
  selector: 'app-salidas-form',
  templateUrl: './salidas-form.component.html',
  styleUrls: ['./salidas-form.component.css']
})
export class SalidasFormComponent implements OnInit {

  salidaForm: FormGroup;
  element: Elements;


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private elementService: ElementsService) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        let id = params.id
        this.elementService.getElement(id)
          .subscribe(
            (data: Elements) => { //success
              this.element = data['element']
            },
            error => console.log(error),
            () => {
              this.salidaForm = this.createFormGroupSalida();

            }
          )


      }
    )
  }

  createFormGroupSalida() {
    return new FormGroup({
      nameElement: new FormControl(this.element.name_element, Validators.required),
      quantityElement: new FormControl(this.element.quantity, Validators.required)

    })
  }

}
