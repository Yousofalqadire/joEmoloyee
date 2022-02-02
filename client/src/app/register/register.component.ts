import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder ,FormControl, ValidatorFn, Validators} from '@angular/forms';
import { Loader } from '@googlemaps/js-api-loader';
import { load } from 'google-maps';
import { AccountService } from 'services/account.service';
import { CustomValidationsService } from 'services/custom-validations.service';
import { LocationService } from 'services/location.service';
import {Location} from '../models/location'
export interface City{
  name:string
}
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  hide = false;
  city :City[] = [
    {name:'الرمثا'},
    {name:'اربد'},
    {name:'جرش'},
    {name:'عجلون'},
    {name:'المفرق'},
    {name:'عمان'},
    {name:'السلط'},
    {name:'مادبا'},
    {name:'الكرك'},
    {name:'الطفيلة'},
    {name:'معان'},
    {name:'العقبة'},
    {name:'الزرقاء'}
    
  ]
  constructor(private fb:FormBuilder,private customValidator:CustomValidationsService,
    private accountService:AccountService,private locationService:LocationService) { }
regForm = this.fb.group({
  Email:new FormControl('',[Validators.required,Validators.email]),
  Password:new FormControl('',[Validators.required]),
  ConfirmPasword:new FormControl('',[Validators.required]),
  FullName:new FormControl('',[Validators.required]),
  Litral:new FormControl('',[Validators.required]),
  photo:new FormControl('',[Validators.required]),
  Photo:new FormControl('',[Validators.required]),
  BirthDay:new FormControl('',[Validators.required]),
  PhoneNumber:new FormControl('',[Validators.required]),
},{
  validator: this.customValidator.passMatchValidator('Password','ConfirmPasword')
});

  ngOnInit(): void {
    this.initialForm();
  }

  initialForm()
  {
    return this.regForm.controls;
  }
  onFileChange(event:any) 
  {
     if(event.target.files.length > 0)
     {
       const file =  event.target.files[0];
       this.regForm.patchValue({Photo :file});
     }
  }

  register()
  {
    this.locationService.getGeoLocation().then(res=> {
      let latlng = {lat:res.lat, lng:res.lng}
      let loader = new Loader({
        apiKey:''
      })
      loader.load().then(()=>{
        const map= new google.maps.Map(document.getElementById('map')as HTMLElement,{
          center:latlng,
          zoom:8
        })
        var geocode = new google.maps.Geocoder;
      geocode.geocode({'location':latlng},function(results:any,status){
        if(status === google.maps.GeocoderStatus.OK)
        {
         let location :Location = {
           Street :results[1].address_components[1].long_name,
           Airea:results[1].address_components[2].long_name,
           City:results[1].address_components[3].long_name,
           Governorate:results[1].address_components[4].long_name,
           Country:results[1].address_components[5].long_name,
           PlaceId:results[1].place_id,
           Latitude:latlng.lat,
           Longitude:latlng.lng
         }
         localStorage.setItem('location',JSON.stringify(location));
         
        } 
          
      }) 
      })
      

    })
    let location:Location = JSON.parse(localStorage.getItem('location') || '{}'); 
    let formData = new FormData();
    formData.append('Email',this.regForm.controls['Email']?.value);
    formData.append('Password',this.regForm.controls['Password']?.value);
    formData.append('ConfirmPassword',this.regForm.controls['ConfirmPassword']?.value);
    formData.append('FullName',this.regForm.controls['FullName']?.value);
    formData.append('Litral',this.regForm.controls['Litral']?.value);
    formData.append('Photo',this.regForm.controls['Photo']?.value);
    formData.append('PhoneNumber',this.regForm.controls['PhoneNumber']?.value);
  
    var date  = this.regForm.controls['BirthDay'].value.toString();
    let validDate = date.slice(4,15);
    formData.append('BirthDay',validDate);
    // location : 
    formData.append('City',location.City || '');
    formData.append('Street',location.Street || '')
    formData.append('Airea',location.Airea || '');
    formData.append('Governorate',location.Governorate || '');
    formData.append('Latitude',location.Latitude?.toString() || '');
    formData.append('Longitude',location.Longitude?.toString() || '');
    formData.append('PlaceId',location.PlaceId || '');
    formData.append('Country',location.Country || '');


   this.accountService.register(formData).subscribe(res=>{
     console.log(res);
   })

  }

}
