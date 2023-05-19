import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { Pag404Component } from './component/pag404/pag404.component';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ConfirmPasswordDirective } from './directives/confirm-password.directive';
import { HomeComponent } from './component/home/home.component';
import { ProfilesComponent } from './component/profiles/profiles.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { ProductProfileComponent } from './component/product-profile/product-profile.component';
import { CatalogueComponent } from './component/catalogue/catalogue.component';
import { FilterPipe } from './pipes/filter.pipe';
import { PriceFilterComponent } from './component/price-filter/price-filter.component';
import { PriceFilterPipe } from './pipes/price-filter.pipe';
import { UserCatalogueComponent } from './component/user-catalogue/user-catalogue.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CategoryFilterPipe } from './pipes/category-filter.pipe';
import { OwnProfileComponent } from './component/own-profile/own-profile.component';
import { FilterUsersPipe } from './pipes/filter-users.pipe';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { EditProductComponent } from './component/edit-product/edit-product.component';
import { TermsConditionsComponent } from './component/terms-conditions/terms-conditions.component';
// import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    Pag404Component,
    ConfirmPasswordDirective,
    HomeComponent,
    ProfilesComponent,
    CatalogueComponent,
    AddProductComponent,
    ProductProfileComponent,
    FilterPipe,
    PriceFilterComponent,
    PriceFilterPipe,
    UserCatalogueComponent,
    CategoryFilterPipe,
    OwnProfileComponent,
    FilterUsersPipe,
    EditProfileComponent,
    EditProductComponent,
    TermsConditionsComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyCqevWuTvdGq3B4_fdcely9aYvM7eULM80'
    // })

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
