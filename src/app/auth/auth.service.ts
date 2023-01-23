import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

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

    apiKey: string = "AIzaSyCNLWOVjW30fxxc-IoYz-zqmjlrrr3sLMs";
    signUpApiUrl: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`;
    signinApiUrl: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`

    constructor(private http: HttpClient) {}

    signup(email:string, password:string){

        return this.http.post<AuthSignupResponseData>(this.signUpApiUrl,
            {
                email: email,
                password: password,
                returnSecureToken: true
            });

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