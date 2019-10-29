import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'

import { AppSettings } from '../../constants'

@Injectable({
  providedIn: 'root'
})
export class OfficesService {

  constructor(private http:HttpClient) { }

  /**
   * getOffices
   */
  public getOffices() {
    return this.http.get(`${AppSettings.API_URL}/Offices/index.json`)
  }
}
