import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LayoutComponent} from './authorization/layout/layout.component';

const routes: Routes = [
  {path: '', loadChildren: './authorization/authorization.module#AuthorizationModule'},
  {path: 'helpdesk', loadChildren: './help-desk/help-desk.module#HelpDeskModule'},
  {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
