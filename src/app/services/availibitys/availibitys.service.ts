import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { AppSettings } from '../../constants'
import {} from '../../models/availibitys'

@Injectable({
  providedIn: 'root'
})
export class AvailibitysService {

  constructor(private http: HttpClient) { }


  getAvailibitys(){
    return this.http.get(`${AppSettings.API_URL}`)
  }
}
