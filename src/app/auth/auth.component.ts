import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

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

        this.isLoading = true;
        if (this.isLoginMode){
            this.authService.signin(email, password).subscribe((responseData)=>{
                console.log(responseData)
                form.reset();
                this.error = null;
                this.isLoading = false;
            }, (error)=>{
                console.error(error.message);
                this.error = "An error occurred!"
                this.isLoading = false;
            });
        } else {
            this.authService.signup(email, password).subscribe((responseData)=>{
                console.log(responseData)
                form.reset();
                this.error = null;
                this.isLoading = false;
            }, (errorMessage)=>{
                console.error(errorMessage);
                this.error = errorMessage;

                this.isLoading = false;
            });
        }


    }

}