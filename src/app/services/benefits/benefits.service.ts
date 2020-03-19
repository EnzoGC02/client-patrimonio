import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {environment} from '../../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class BenefitsService {

  private API_URL:string=environment.baseUrl

  // API_URL='http://localhost/server-patrimonio';

  constructor(private http:HttpClient) { }


  //all
  getBenefits(){
    return this.http.get(`${this.API_URL}/TypesBenefitsOfUse.json`);
  }

  //indivudual
  getBenefit(id_benef){
    return this.http.get(`${this.API_URL}/TypesBenefitsOfUse/${id_benef}.json`)
  }
}
