import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { AuthResponseData, AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {

    constructor(private authService: AuthService) {};

    isLoginMode: boolean = true;
    isLoading: boolean = false;
    error: string = null;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){
        if (!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>;

        this.isLoading = true;
        if (this.isLoginMode){
            authObs = this.authService.signin(email, password);
        } else {
            authObs = this.authService.signup(email, password);
        };

        authObs.subscribe((responseData)=>{
            form.reset();
            this.error = null;
            this.isLoading = false;
        }, (errorMessage)=>{
            this.error = errorMessage;
            this.isLoading = false;
        });


    }

}