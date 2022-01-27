import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'services/account.service';
import { LoginComponent } from '../login/login.component';
import { LoginDto } from '../models/login';
import { User } from '../models/user';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
user  :User |undefined;
  constructor(public accountService:AccountService,
    private matSnack:MatSnackBar,private matDialog:MatDialog) { }

  ngOnInit( ): void {
    this.setCurrintUser()
  }


openLoginDialog()
{
 let dialog= this.matDialog.open(LoginComponent,{
   width:'500px',
   height:'500px'
 })
  dialog.afterClosed().subscribe(res=>{
    const login:LoginDto = res;
    this.accountService.login(login).subscribe();
  })
}

setCurrintUser()
{
   this.accountService.currintUser$.subscribe(res=>{
     this.user = res;
   })
}

}
