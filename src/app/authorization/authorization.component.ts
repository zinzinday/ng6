import { Component, OnInit } from '@angular/core';
import {LayoutService} from '../providers/services/layout.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent implements OnInit {

  constructor(public layout: LayoutService) { }

  ngOnInit() {
  }

}
