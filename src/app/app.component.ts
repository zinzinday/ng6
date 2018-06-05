import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {LayoutService} from './providers/services/layout.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  layoutIndex = 0;
  constructor(public layout: LayoutService) {
  }
}
