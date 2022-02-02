import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/models/order';
import { environment } from 'src/environments/environment';
let httpHeader = new HttpHeaders({
  'Content-Type':'application/json'
})
let headers = {headers:httpHeader}
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
baseUrl = environment.baseUrl + 'order/'
  constructor(private http :HttpClient) { }

  addOrder(model:Order):Observable<Order>
  {
    return this.http.post<Order>(this.baseUrl + 'addOrder',JSON.stringify(model),headers);
  }
}
