import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

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

    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient,
        private router: Router) {}

    signup(email:string, password:string){

        return this.http.post<AuthResponseData>(this.signUpApiUrl,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe( catchError(this.handleError), tap(resData => {
                this.handleAuthentication(
                    resData.email,
                    resData.localid,
                    resData.idToken,
                    +resData.expiresin);
            }) );

    };

    autoLogin() {
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpireationDate: string
        } = JSON.parse(localStorage.getItem("userData"));
        if (!userData){
            return;
        };

        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpireationDate));

        if (loadedUser.token) {
            this.user.next(loadedUser);
        };

    }

    signin(email: string, password: string){
        return this.http.post<AuthResponseData>(this.signinApiUrl,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }).pipe( catchError(this.handleError), tap(resData=> {
                this.handleAuthentication(
                    resData.email,
                    resData.localid,
                    resData.idToken,
                    +resData.expiresin);
            }))
    };

    logout() {
        this.user.next(null);
        this.router.navigate(['/auth']);
    };

    private handleAuthentication(email: string, userId:string, token: string, expiresIn: number ) {
        const expirationDate = new Date(new Date().getTime() + (+expiresIn* 1000));

        const user = new User(email, userId, token, expirationDate );

        this.user.next(user);

        localStorage.setItem('userData', JSON.stringify(user));
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
    };
}