import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";

@Injectable()
export class DataStorageService {

    apiUrl: string = "https://angular-574cf-default-rtdb.firebaseio.com/recipes.json";

    constructor(private http: HttpClient, private recipeService: RecipeService) {};

    storeRecipes(){
        const recipes = this.recipeService.getRecipes();

        this.http.put(this.apiUrl, recipes).subscribe((response)=>{
            console.log(response)
        });
    }
}