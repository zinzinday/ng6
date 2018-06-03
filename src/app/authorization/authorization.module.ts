import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LayoutComponent} from './layout/layout.component';
import {LoginComponent} from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [LayoutComponent, LoginComponent, RegisterComponent]
})
export class AuthorizationModule {
}
