import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { productStateService } from '../product.state.service';
import { Product } from '../products';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  products:Product[]=[];
  productAdditionForm:any;
  addItems:boolean=false;
  cancelChosen:boolean=false;
  productTypes:any=[];
  error:any;
  destroySub= new Subject();
  constructor(private fb:FormBuilder,private productService:ProductsService,private stateService:productStateService,private router:Router) { }

  ngOnInit(): void {
    this.getItems();
    this.getCategories();
    this.productAdditionForm=this.fb.group({
      productId:['',Validators.compose([Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)])],
      productTitle:['',Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(100)])],
      productCategory:['',Validators.required],
      productDesc:['',Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(100)])],
      productImage:['',Validators.required],
      productPrice:['',Validators.compose([Validators.required,Validators.pattern(/^([0-9]+\.?[0-9]*|\.[0-9]+)$/)])]
    })
  }

  getCategories(){
    this.error=null;
    this.productService.getCategories().pipe(takeUntil(this.destroySub)).subscribe(
      (response:any) => {
        console.log(response);
        this.productTypes=response;
      },
      error => this.error = error
    );
  }

  getItems(){
    this.productService.getAllProducts().pipe(takeUntil(this.destroySub)).subscribe(
      (response: any) => {
        console.log(response);
        this.products=response;
      },
      error => this.error = error
    );
  }

  addItemToDB(){
    this.error=null;
    const payload:Product={
      id:this.productAdditionForm.controls.productId.value,
      price:this.productAdditionForm.controls.productPrice.value,
      category:this.productAdditionForm.controls.productCategory.value,
      description:this.productAdditionForm.controls.productDesc.value,
      image:this.productAdditionForm.controls.productImage.value,
      title:this.productAdditionForm.controls.productTitle.value
    }
    this.productService.addItem(payload).pipe(takeUntil(this.destroySub)).subscribe(
      (response: any) => {
        console.log(response);
        if(response){
          this.getItems();
          this.cancelAddition(true);
          alert(`Item with id as `+response.id+` has been added succesfully!!`);
        }
      },
      error => this.error = error
    );
  }

  deleteItem(id:any){
    this.error=null;
    this.productService.deleteItem(id).pipe(takeUntil(this.destroySub)).subscribe(
      (response: any) => {
        console.log(response);
        if(response){
          this.getItems();
          alert(`Item has been deleted from site succesfully!!`);
        }
      },
      error => this.error = error
    );
  }

  addItem(){
    this.addItems=!this.addItems
  }

  cancelAddition(isCancel:any){
    if(isCancel){
      this.productAdditionForm.reset();
      this.addItems=!this.addItems
    }
  }

  viewDetails(item:any){
    this.stateService.changeDetails(item);
    this.router.navigate(["/viewDetails"]);
  }

  ngOnDestroy(){
    this.destroySub.next(null);
  }
}
