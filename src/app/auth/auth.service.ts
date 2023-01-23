import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresin: string;
    localid: string;
    registered?: boolean;
};

@Injectable()
export class AuthService {

    private apiKey: string = "AIzaSyCNLWOVjW30fxxc-IoYz-zqmjlrrr3sLMs";
    private signUpApiUrl: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
    private signinApiUrl: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`

    constructor(private http: HttpClient) {}

    signup(email:string, password:string){

        return this.http.post<AuthResponseData>(this.signUpApiUrl,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe( catchError(this.handleError) );

    };

    signin(email: string, password: string){
        return this.http.post<AuthResponseData>(this.signinApiUrl,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe( catchError(this.handleError))
    };

    private handleError(errorRes: HttpErrorResponse){

        let errorMessage = "An unknown error occurred";

        if (!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage)
        }

        switch(errorRes.error.error.message) {
            case "INVALID_PASSWORD":
                errorMessage = "Invalid password provided";
                break;
            case "EMAIL_NOT_FOUND":
                errorMessage = "Invalid email provided";
                break;
            case "EMAIL_EXISTS":
                errorMessage = "This email exists already";
                break;
            case "USER_DISABLED":
                errorMessage = "The user account has been disabled"
        }

        return throwError(errorMessage);
    }
}