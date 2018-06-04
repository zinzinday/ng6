import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

const routes: Routes = [
  {path: 'authorization', loadChildren: './authorization/authorization.module#AuthorizationModule'},
  {path: 'helpdesk', loadChildren: './help-desk/help-desk.module#HelpDeskModule'},
  {path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
