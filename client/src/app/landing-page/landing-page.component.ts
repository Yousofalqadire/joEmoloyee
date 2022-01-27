import { Component, OnInit } from '@angular/core';
import { Loader } from "@googlemaps/js-api-loader"
import { LocationService } from 'services/location.service';
import {Location} from '../models/location'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  // latitude:number = 31.963158;  jordan latlng
  // longitude:number = 35.930359;
  
  constructor(private locationService:LocationService ) { }
  ngOnInit(): void {
   this.initMap();
  }

  initMap(){

    this.locationService.getGeoLocation().then(res=>{

      let ululr = {lat:res.lat,lng:res.lng}
      
      let loader = new Loader({
      })
     loader.load().then(()=>{
     const map= new google.maps.Map(document.getElementById('map') as HTMLElement,{
         center:ululr,
         zoom:8
       })
       //
      
       let marker = new google.maps.Marker({
         position:ululr,
         map:map

       })
       
       var geocode = new google.maps.Geocoder;
     let  lat = marker.getPosition()?.lat
     let lng = marker.getPosition()?.lng
     let latlng = {lat:parseFloat(ululr.lat),lng:parseFloat(ululr.lng)};
     geocode.geocode({'location':latlng},function(results:any,status){
       if(status === google.maps.GeocoderStatus.OK)
       {
        // all details in results object( location details)
        let location :Location = {
          Airea:results[1].address_components[1].long_name,
          City:results[1].address_components[2].long_name,
          Governorate:results[1].address_components[3].long_name,
          Country:results[1].address_components[4].long_name,
          PlaceId:results[1].place_id,
          Latitude:ululr.lat,
          Longitude:ululr.lng
        }
        console.log(location)
       }   
     })       
     })
    })

  }
 
 
}
