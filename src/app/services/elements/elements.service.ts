import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AppSettings } from '../../constants'
import { Elements } from '../../models/elements'
import { Observable, Subject, Subscriber } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  private elements: Elements[] = [];
  constructor(private http: HttpClient) { }


  getElements(){
    return this.http.get(`${AppSettings.API_URL}/Elements/index.json`)
  }
  getElement(id){
    return this.http.get(`${AppSettings.API_URL}/Elements/view/${id}.json`)
  }


  getElementsForTypeBenefit(id) {
    if (id)
      return this.http.get(`${AppSettings.API_URL}/Elements/getElementsForTypeBenefit/${id}.json`)
  }

  saveElement(element) {
    return this.http.post(`${AppSettings.API_URL}/Elements/add.json`, element)
  }

  getAvailibityOfElement(id_elem:number){
    return this.http.get(`${AppSettings.API_URL}/Elements/getAvailibityOfElement/${id_elem}.json`)
  }


}
