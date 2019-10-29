import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router'
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Elements } from '../../../models/elements'
import { Office } from '../../../models/offices'
import { Outputs } from '../../../models/outputs'

import { ElementsService } from '../../../services/elements/elements.service'
import { OfficesService } from '../../../services/offices/offices.service'
import { OutputsService } from '../../../services/outputs/outputs.service'
@Component({
  selector: 'app-salidas-form',
  templateUrl: './salidas-form.component.html',
  styleUrls: ['./salidas-form.component.css']
})
export class SalidasFormComponent implements OnInit {

  salidaForm: FormGroup;
  element: Elements;
  output: Outputs;
  //enabledInputDate:Boolean=true


  officesList: Office[] = []
  availibitysList = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private elementService: ElementsService,
    private officeService: OfficesService,
    private outputsService: OutputsService
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      (params: Params) => {
        let id_elem = params.id
        this.elementService.getElement(id_elem)
          .subscribe(
            (data: Elements) => { //success
              this.element = data['element']
            },
            error => console.log(error),
            () => {
              this.salidaForm = this.createFormGroupSalida();
              this.setAvailibitysList()
              this.setOfficesList()
            }
          )
      }
    )

  }

  setAvailibitysList() {
    this.elementService.getAvailibityOfElement(this.element.id_element)
      .subscribe(
        data => {
          this.availibitysList = data['availabitys']
        },
        error => console.error(error)

      )
  }

  setOfficesList() {
    this.officeService.getOffices()
      .subscribe(
        (data: Office) => {
          this.officesList = data['offices']
        }
      )
  }
  createFormGroupSalida() {
    return new FormGroup({
      nameElement: new FormControl(this.element.name_element, Validators.required),
      quantityElement: new FormControl(this.element.quantity, Validators.required),
      reasonOutput: new FormControl('', Validators.required),
      qunatityOfOut: new FormControl('', [Validators.required, Validators.max(this.element.quantity)]),
      idOffice: new FormControl('', Validators.required),
      dateOfOutput: new FormControl(this.getMinDate(), Validators.required),
      houreOfOuput: new FormControl(this.getMinHoure(), Validators.required),
      proceedings: new FormControl('', [Validators.required, Validators.min(1)]),
      description: new FormControl('', [Validators.required])
    })
  }

  saveNewOutput() {
    if (this.salidaForm.valid) {
      let date = this.salidaForm.get('dateOfOutput').value + " " + this.salidaForm.get('houreOfOuput').value + ":00" //formatea la fecha para que sea aceptada por la API

      //creo el objeto de Output 
      this.output = new Outputs(
        this.salidaForm.get('reasonOutput').value,
        this.element.id_element,
        this.salidaForm.get('idOffice').value,
        date,
        this.salidaForm.get('proceedings').value,
        this.salidaForm.get('description').value
      );

      this.outputsService.saveOutput(this.output)
        .subscribe(
          (data) => console.log(data),
          (error)=>console.log(error),
          ()=>{console.log("end request");
          }
          
        )
    }
  }




 
  //metodos para establecer valores minimos en los input de tipo date y time

  //calcula la fecha actual
  getMinDate(): string {
    let fecha = new Date()
    let mes = (fecha.getUTCMonth() + 1 < 10) ? "0" + (fecha.getUTCMonth() + 1) : fecha.getUTCMonth() + 1
    let dia = fecha.getUTCDate() < 10 ? "0" + fecha.getUTCDate() : fecha.getUTCDate()
    let fechaActual = fecha.getFullYear() + "-" + mes + "-" + dia
    return fechaActual
  }

  //calcula hora actual
  getMinHoure(): string {
    let h = new Date()
    let hora = h.getHours() < 10 ? "0" + h.getHours() : h.getHours()
    let minutes = h.getUTCMinutes() < 10 ? "0" + h.getUTCMinutes() : h.getUTCMinutes()
    let horaActual = hora + ":" + minutes
    return horaActual

  }
  enabledInputDate():void {

    let d = document.getElementById('inputDateOfOutput')
    let h = document.getElementById('inputHoureOfOutput')
    if (d.hasAttribute('disabled') && h.hasAttribute('disabled')) {
      d.removeAttribute('disabled');
      h.removeAttribute('disabled');
    }
    else {
      d.setAttribute('disabled', 'true')
      h.setAttribute('disabled', 'true')
    }
  }

}
