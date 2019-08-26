import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CategorysService {

  API_URL='http://localhost/server-patrimonio/';
  constructor(private http:HttpClient) { }

  getCategoryForBenefyt(id_benef:number){

    return this.http.get(`${this.API_URL}/CategorysOfElement/getForBenefit/${id_benef}.json`);
  }
}
