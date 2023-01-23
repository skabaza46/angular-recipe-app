import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { exhaustMap, map, take, tap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable()
export class DataStorageService {

    apiUrl: string = "https://angular-574cf-default-rtdb.firebaseio.com/recipes.json";

    constructor(private http: HttpClient,
        private recipeService: RecipeService,
        private authService: AuthService) {};

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();

        this.http.put(this.apiUrl, recipes)

        .subscribe((response)=>{
            console.log(response)
        });
    }

    fetchRecipes() {

       return this.http
        .get<Recipe[]>(this.apiUrl)
        .pipe(
            map((recipes)=>{
                return recipes.map((recipe)=>{
                    return {
                        ...recipe,
                        ingredients: recipe.ingredients? recipe.ingredients: []
                    };
                });
            }),
            tap((recipes)=>{
                this.recipeService.setRecipes(recipes);
            })
        );
    };
}