import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class LoginService {
    constructor(
        private http: HttpClient,
    ) { }

    public AuthenticateUser(request:any) { 
        return this.http.post("https://reqres.in/api/login",request); 
    } 
}