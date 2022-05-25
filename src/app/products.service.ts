import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './products';
@Injectable()
export class ProductsService {
    constructor(
        private http: HttpClient,
    ) { }

    public getCategories() { 
        return this.http.get("https://fakestoreapi.com/products/categories"); 
    }
    
    public getAllProducts() { 
        return this.http.get("https://fakestoreapi.com/products"); 
    }

    public addItem(payload:Product){
        const req= JSON.stringify(payload);
        return this.http.post("https://fakestoreapi.com/products",req)
    }

    public deleteItem(id:any){
        return this.http.delete("https://fakestoreapi.com/products/" + id)
    }

    public modifyItem(id:any,body:any){
        return this.http.put("https://fakestoreapi.com/products/"+ id,body);
    }
}