import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {AppSettings} from '../../constants'
import {Elements} from '../../models/elements'
import { Observable,Subject, Subscriber } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  message:string='';
  private elements$:Subject<Elements[]>=new Subject<Elements[]>();
  private elements:Elements[]=[];
  constructor(private http:HttpClient) { }

  saveElement(element){
    return this.http.post(`${AppSettings.API_URL}/Elements/add.json`,element)   
  }

  getElements(){
    return this.http.get(`${AppSettings.API_URL}/Elements/index.json`)
  }

}
  