import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'',loadComponent:()=>import('./weather/weather.component').then(r=>r.WeatherComponent)
    }
];
