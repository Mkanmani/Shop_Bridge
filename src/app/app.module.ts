import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { ProductsService } from './products.service';
import { ViewProductComponent } from './view-product/view-product.component';
import { productStateService } from './product.state.service';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginComponent,
    DashboardComponent,
    ViewProductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [LoginService, ProductsService, productStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
