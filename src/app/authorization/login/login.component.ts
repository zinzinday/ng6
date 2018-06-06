import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LayoutService} from '../../providers/services/layout.service';
import {Router} from '@angular/router';
import {RestService} from '../../providers/services/rest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    user: ['', Validators.required],
    password: ['', Validators.required]
  });
  visible: false;
  inProgress = false;

  constructor(public layout: LayoutService,
              private fb: FormBuilder,
              private router: Router,
              private rest: RestService) {

  }

  ngOnInit() {

  }
  goRegister() {
    this.router.navigate(['register']).catch();
    return false;
  }
  goReset() {
    this.router.navigate(['reset']).catch();
    return false;
  }
  onLogin() {
    if (this.loginForm.valid) {
      this.inProgress = true;
      this.rest.login(this.loginForm.value).subscribe((body) => {
        if (body.success) {
          this.rest.auth.credential = body.data.credential;
          this.rest.auth.profile = body.data.profile;
          this.layout.alert('You have logged in success!');
          // this.snackBar.open('', 'Dismiss', {duration: 3000});
          this.router.navigate(['finances']).catch();
        } else {
          this.rest.setErrors(this.loginForm, body.errors);
        }
        this.inProgress = false;
      }, () => {
        this.inProgress = false;
      });
    }
  }
}
