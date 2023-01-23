import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { DataStorageService } from "../shared/data-storage.service";

@Component({
    selector: "app-header",
    templateUrl:"header.component.html",
})

export class HeaderComponent implements OnInit , OnDestroy{
    isAuthenticated: boolean = false;

    private userSub: Subscription;

    constructor(private dateStorageService: DataStorageService,
        private authService: AuthService){};

    ngOnInit(): void {

        this.userSub = this.authService.user.subscribe(user => {
            this.isAuthenticated = !!user;
        });
    }

    onSaveData(){
        this.dateStorageService.storeRecipes();
    }
    onFetchData(){
        this.dateStorageService.fetchRecipes().subscribe();
    }

    ngOnDestroy(): void {
        this.userSub.unsubscribe();
    }
}