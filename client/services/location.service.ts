import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }
  getGeoLocation():Promise<any>
  {
    return new Promise((resolve,reject)=>{
     navigator.geolocation.getCurrentPosition(res=>{
       resolve({lat : res.coords.latitude,lng:res.coords.longitude});
       reject('لن نستطيع مساعدتك بدون الحصول على اذنك في تحديد موقعك')
     })
    })
  }
}
