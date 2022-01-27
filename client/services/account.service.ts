import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginDto } from 'src/app/models/login';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';
let httpHeaders = new HttpHeaders({
  'Content-Type':'application/json'
})
let header = {headers:httpHeaders}
@Injectable({
  providedIn: 'root'
})
export class AccountService {
private currintUserSource = new ReplaySubject<User>(1);
currintUser$ = this.currintUserSource.asObservable();
  constructor(private http :HttpClient) { }
  baseUrl = environment.baseUrl;

  register(model:any):Observable<boolean>
  {
    return this.http.post<boolean>(this.baseUrl +'account/register',model);
  }

  login(model:LoginDto)
  {
     return this.http.post<User>(this.baseUrl +'account/login' , JSON.stringify(model),header).pipe(
       map((response:User)=>{
         const user = response;
         if(user)
         {
           localStorage.setItem('user',JSON.stringify(user));
           this.currintUserSource.next(user);
         }
       })
     )
  }

  setCurintUser(user:User)
  {
    localStorage.setItem('user',JSON.stringify(user));

  }
  logOut()
  {
    localStorage.removeItem('user');
    this.currintUserSource.unsubscribe();
  }
}
