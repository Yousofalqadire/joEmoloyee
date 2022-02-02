import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LoginDto } from '../models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
showPassword:boolean = false;
  constructor(private dialogRef:MatDialogRef<LoginComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any 
    ,private fb:FormBuilder) { }
  loginForm = this.fb.group({
    Email:new FormControl('',[Validators.required,Validators.email]),
    Password:new FormControl('',[Validators.required])

  });
  ngOnInit(): void {
    this.initialForm();
  }
  initialForm()
  {
    return this.loginForm.controls;
  }
  closeDialog()
  {
    this.dialogRef.close(this.loginForm.value);
  }
  
}
