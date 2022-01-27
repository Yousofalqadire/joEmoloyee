import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder ,FormControl, ValidatorFn, Validators} from '@angular/forms';
import { AccountService } from 'services/account.service';
import { CustomValidationsService } from 'services/custom-validations.service';
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
    private accountService:AccountService) { }
regForm = this.fb.group({
  Email:new FormControl('',[Validators.required,Validators.email]),
  Password:new FormControl('',[Validators.required]),
  ConfirmPasword:new FormControl('',[Validators.required]),
  FullName:new FormControl('',[Validators.required]),
  City:new FormControl('',[Validators.required]),
  Street:new FormControl('',[Validators.required]),
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
    let formData = new FormData();
    formData.append('Email',this.regForm.controls['Email']?.value);
    formData.append('Password',this.regForm.controls['Password']?.value);
    formData.append('ConfirmPassword',this.regForm.controls['ConfirmPassword']?.value);
    formData.append('FullName',this.regForm.controls['FullName']?.value);
    formData.append('City',this.regForm.controls['City']?.value);
    formData.append('Street',this.regForm.controls['Street']?.value);
    formData.append('Litral',this.regForm.controls['Litral']?.value);
    formData.append('Photo',this.regForm.controls['Photo']?.value);
    formData.append('PhoneNumber',this.regForm.controls['PhoneNumber']?.value);
  
    var date  = this.regForm.controls['BirthDay'].value.toString();
    let validDate = date.slice(4,15);
    formData.append('BirthDay',validDate);
   this.accountService.register(formData).subscribe(res=>{
     console.log(res);
   })
  }

}
