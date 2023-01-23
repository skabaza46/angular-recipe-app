import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";

interface AuthSignupResponseData {
    kind: string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresin: string;
    localid: string;
};

interface AuthSigninResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresin: string;
    localid: string;
    registered: boolean;
};

@Injectable()
export class AuthService {

    private apiKey: string = "AIzaSyCNLWOVjW30fxxc-IoYz-zqmjlrrr3sLMs";
    private signUpApiUrl: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
    private signinApiUrl: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`

    constructor(private http: HttpClient) {}

    signup(email:string, password:string){

        return this.http.post<AuthSignupResponseData>(this.signUpApiUrl,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe( catchError((errorRes)=>{
                let errorMessage = "An unknown error occurred";

                if (!errorRes.error || !errorRes.error.error){
                    return throwError(errorMessage)
                }

                switch(errorRes.error.error.message) {
                    case "EMAIL_EXISTS":
                        errorMessage = 'This email exists already'
                }

                return throwError(errorMessage);
            }) );

    };

    signin(email: string, password){
        return this.http.post<AuthSigninResponseData>(this.signinApiUrl,
            {
                email: email,
                password: password,
                returnSecureToken: true
            })
    }
}