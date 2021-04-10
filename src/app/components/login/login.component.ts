import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Router} from "@angular/router";
import {AuthGuard} from "../../guards/auth.guard";
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    previousUrl;
    loginForm: FormGroup;

    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router,
                private authGuard: AuthGuard,
                private toastrService: ToastrService) {
        this.createForm();
    }

    ngOnInit(): void {
        if (this.authService.loggedIn())
            this.router.navigateByUrl('/home');

        if (this.authGuard.redirectUrl) {
            this.previousUrl = this.authGuard.redirectUrl;
            this.authGuard.redirectUrl = undefined;
        }
    }

    createForm() {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    onLoginSubmit() {
        const user = {
            email: this.loginForm.get('email').value,
            password: this.loginForm.get('password').value
        };

        this.authService.signIn(user).subscribe((data: any) => {
            if (data.success) {
                this.authService.storeUserData(data.token, data.user);
                if (this.previousUrl) {
                    this.router.navigate([this.previousUrl]);
                } else {
                    this.toastrService.success(data.message);
                    this.router.navigate(['/home']);
                }
            } else if (!data.success) {
                this.toastrService.error(data.message);
            }
        }, (error) => {
            console.log(error);
        });
    }

}
