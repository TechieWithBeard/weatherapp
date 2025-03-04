import { Component } from '@angular/core';
import { WeatherService } from './weather.service';
import { WeatherData } from './weather.model';
import { CommonModule } from '@angular/common';
import { forkJoin, mergeMap, Observable, of } from 'rxjs';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss'
})
export class WeatherComponent {
 states:string[]=[
  "California",
  "Texas",
  "Florida",
  "New York",
  "Pennsylvania",
  "Illinois",
  "Ohio",
  "Georgia",
  "North Carolina",
  "Michigan"
];

weatherData:WeatherData[]=[]

constructor(private weatherService:WeatherService){

}

ngOnInit(){
  this.loadWeather()


}

weatherData$!:Observable<WeatherData>[]


loadWeather(){
  let listData:Observable<WeatherData>[]=[]
  this.states.forEach(state=>{
    listData.push(this.weatherService.getWeatherData(state))
  });

  // Promise.all(listData).then(r=>{
    
  //   this.weatherData$=[...r]

  //   this.weatherData$.forEach(r=>{
  //     r.subscribe(
  //       t=>{
  //         this.weatherData.push(t)
  //       }
  //     )
  //   })


  // })

  forkJoin(listData).subscribe(r=>{
    console.log(r)
    // this.weatherData.push(r)
    this.weatherData=[...r]
  })



}


async loadWeatherParallel(state:string){
  return  this.weatherService.getWeatherData(state)
}

}
