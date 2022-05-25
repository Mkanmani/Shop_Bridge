import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { productStateService } from '../product.state.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  productData:any;
  modifyChosen:boolean=false;
  productModificationForm: any;
  destroySubject= new Subject();
  productTypes:any=[];
  constructor( private dataService: productStateService,private router:Router,private fb:FormBuilder,private productService:ProductsService) { }

  ngOnInit(): void {
    this.getCategories();
    this.dataService.currentSubject.subscribe(res => this.productData = res)
    console.log(this.productData);
    this.productModificationForm=this.fb.group({
      productTitle:['',Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(100)])],
      productCategory:['',Validators.required],
      productDesc:['',Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(150)])],
      productImage:['',Validators.required],
      productPrice:['',Validators.compose([Validators.required,Validators.pattern(/^([0-9]+\.?[0-9]*|\.[0-9]+)$/)])]
    })
  }

  navToDashboard(){
    this.router.navigate(["/dashboard"]);
  }

  getCategories(){
    this.productService.getCategories().pipe(takeUntil(this.destroySubject)).subscribe(
      (response:any) => {
        console.log(response);
        this.productTypes=response;
      },
    );
  }

  modifyItem(){
    this.modifyChosen=!this.modifyChosen;
    this.productModificationForm.controls.productTitle.patchValue(this.productData.title);
    this.productModificationForm.controls.productCategory.patchValue(this.productData.category);
    this.productModificationForm.controls.productDesc.patchValue(this.productData.description);
    this.productModificationForm.controls.productImage.patchValue(this.productData.image);
    this.productModificationForm.controls.productPrice.patchValue(this.productData.price);   
  }

  saveModifiedItem(){
    const payload={
      price:this.productModificationForm.controls.productPrice.value,
      category:this.productModificationForm.controls.productCategory.value,
      description:this.productModificationForm.controls.productDesc.value,
      image:this.productModificationForm.controls.productImage.value,
      title:this.productModificationForm.controls.productTitle.value
    }
    this.productService.modifyItem(this.productData.id,payload).pipe(takeUntil(this.destroySubject)).subscribe(
      (response: any) => {
        console.log(response);
        if(response){
          alert(`Item with id as `+response.id+` has been modified succesfully!!`);
          this.router.navigate(["/dashboard"]);
        }
      },
    );
  }

  ngOnDestroy(){
    this.destroySubject.next(null);
  }
}
