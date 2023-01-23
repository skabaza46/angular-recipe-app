import { Component } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html'
})
export class AuthComponent {

    constructor(private authService: AuthService) {};

    isLoginMode: boolean = false;

    onSwitchMode() {
        this.isLoginMode = !this.isLoginMode;
    }

    onSubmit(form: NgForm){
        if (!form.valid){
            return;
        }
        const email = form.value.email;
        const password = form.value.password;

        if (this.isLoginMode){
            this.authService.signin(email, password).subscribe((responseData)=>{
                console.log(responseData)
                form.reset();
            }, (error)=>{
                console.error(error.message);
            });
        } else {
            this.authService.signup(email, password).subscribe((responseData)=>{
                console.log(responseData)
                form.reset();
            }, (error)=>{
                console.error(error.message);
            });
        }


    }

}