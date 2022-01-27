import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CustomValidationsService {

  constructor() { }

passMatchValidator(passwordVal:string,ConfirmPasswordVal:string)
{
   return (form:FormGroup)=>{
   const passControl = form.controls[passwordVal];
   const confirmPassControl = form.controls[ConfirmPasswordVal];
   if(!passControl || !confirmPassControl) 
   {
     return null
   }
   
   if(confirmPassControl.value !== passControl.value)
   {
    return confirmPassControl.setErrors({passwordMismatch :true})
   }else{
     confirmPassControl.setErrors(null);
   }
   } 
   
}

}
