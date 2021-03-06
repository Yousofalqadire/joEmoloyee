import { Component, OnInit } from '@angular/core';
import { AccountService } from 'services/account.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private accountService:AccountService){}
  ngOnInit(): void {
    this.setCurrintUser();
  }
  
setCurrintUser()
{
    const user:User = JSON.parse(localStorage.getItem('user') || '{}');
    this.accountService.setCurintUser(user);
}

}
