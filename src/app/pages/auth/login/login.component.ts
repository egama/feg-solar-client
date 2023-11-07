import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthController } from 'src/app/core/controllers/auth/auth.controller';
import { AccessService } from 'src/app/core/services/access.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private fb: UntypedFormBuilder,
    private accessService: AccessService,
    private authController: AuthController,
    private _activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm = () => {
    this.form = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      lembrar: [false],
    });
  };

  @ViewChild('mcnp') mcnp?: any;

  form!: UntypedFormGroup;

  loading = false;
  login = () => {
    if (this.form.valid) {
      this.loading = true;
      this.authController
        .loginClient(this.form.value.email, this.form.value.password)
        .subscribe({
          next: (resp: any) => {
            if (resp.data) {
              this.accessService.access = resp.data;
            }
          },
          complete: () => {
            this.router.navigate(["sac"]);
          },
        });
    }
  };

  enter(event: any) {
    if (
      event.keyCode == 13 &&
      this.form.value.email != '' &&
      this.form.value.password != ''
    ) {
      this.login();
    }
  }
}
