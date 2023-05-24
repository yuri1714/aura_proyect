import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { AddProductComponent } from './component/add-product/add-product.component';
import { ProfilesComponent } from './component/profiles/profiles.component';
import { ProductProfileComponent } from './component/product-profile/product-profile.component';
import { CatalogueComponent } from './component/catalogue/catalogue.component';
import { Pag404Component } from './component/pag404/pag404.component';
import { AuthGuard } from './guard/auth.guard';
import { UserCatalogueComponent } from './component/user-catalogue/user-catalogue.component';
import { OwnProfileComponent } from './component/own-profile/own-profile.component';
import { EditProductComponent } from './component/edit-product/edit-product.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { TermsConditionsComponent } from './component/terms-conditions/terms-conditions.component';
import { ChatComponent } from './component/chat/chat.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
    data: {
      undefined: 'undefined'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {
      undefined: 'undefined'
    }
  },
  {
    path: 'add-product',
    component: AddProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-product/:id',
    component: EditProductComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ownprofile',
    component: OwnProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:id',
    component: ProfilesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'product-profile/:id',
    component: ProductProfileComponent
  },
  {
    path: 'catalogue',
    component: CatalogueComponent
  },
  {
    path: 'user-catalogue',
    component: UserCatalogueComponent,
    canActivate: [AuthGuard],
    data: {
      role: 'admin'
    }
  },
  {
    path: 'chat/:id',
    component: ChatComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'terms-conditions',
    component: TermsConditionsComponent
  },
  {
    path: '**',
    component: Pag404Component,
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
