import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './authorization/login/login.component';
import {AuthorizationComponent} from './authorization/authorization.component';
import {RegisterComponent} from './authorization/register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SettingsComponent} from './dashboard/settings/settings.component';
import {SettingProfileComponent} from './dashboard/settings/setting-profile/setting-profile.component';
import {SettingReferenceComponent} from './dashboard/settings/setting-reference/setting-reference.component';
import {SettingSecurityComponent} from './dashboard/settings/setting-security/setting-security.component';
import {LayoutModule} from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule, MatSnackBarModule, MatCardModule, MatMenuModule, MatProgressBarModule, MatFormFieldModule, MatInputModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AuthorizationComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SettingsComponent,
    SettingProfileComponent,
    SettingReferenceComponent,
    SettingSecurityComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule,
    MatCardModule,
    MatMenuModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
