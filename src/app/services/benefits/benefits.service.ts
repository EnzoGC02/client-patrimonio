import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BenefitsService {

  API_URL='http://localhost/server-patrimonio';

  constructor(private http:HttpClient) { }


  //all
  getBenefits(){
    return this.http.get(`${this.API_URL}/TypesBenefitsOfUse/index.json`);
  }

  //indivudual
  getBenefit(id_benef){
    return this.http.get(`${this.API_URL}/TypesBenefitsOfUse/view/${id_benef}`)
  }
}
