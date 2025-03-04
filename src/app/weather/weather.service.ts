import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { WeatherData } from './weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private _http:HttpClient) { }

  getWeatherData(countryName:string):Observable<WeatherData>{
    return this._http.get<any>(`https://api.weatherapi.com/v1/current.json?q=${countryName}&key=0c489ec63fd5477893034448240803`).pipe(
      map(r=>{

        let obj={
          state:r.location.name,
          temperature_c:r.current.temp_c,
          temperature_f:r.current.temp_f
        }
        
        return obj
      })
    )
  }
}
