import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import { AppSettings } from '../../constants'
import { Outputs } from 'src/app/models/outputs';

@Injectable({
  providedIn: 'root'
})
export class OutputsService {

  constructor(private http:HttpClient) { }

  /**
   * getOutputs
   */
  public getOutputs() {
    return this.http.get(`${AppSettings.API_URL}/Outputs/index.json`)
  }

  public saveOutput(output:Outputs){
    return this.http.post(`${AppSettings.API_URL}/Outputs/add.json`,output)
  }
}
