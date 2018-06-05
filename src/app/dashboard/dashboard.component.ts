import {Component} from '@angular/core';
import {LayoutService} from '../providers/services/layout.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {


  constructor(public layout: LayoutService) {
  }


}
