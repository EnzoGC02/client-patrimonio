import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {AppSettings} from '../../constants'
import {Elements} from '../../models/elements'

@Injectable({
  providedIn: 'root'
})
export class ElementsService {

  constructor(private http:HttpClient) { }

  saveElement(element){
    return this.http.post(`${AppSettings.API_URL}/Elements/add.json`,element);
  }
}
  