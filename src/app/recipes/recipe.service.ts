import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe("A Test Recipe", "This is simply a test", "https://cdn.loveandlemons.com/wp-content/uploads/2020/03/pantry-recipes-2.jpg"),
        new Recipe("A Test Recipe2", "This is simply a test2", "https://img.buzzfeed.com/video-api-prod/assets/eb44570519264864814264f7f0a5e47a/BFV13909_BakedRatatouille-ThumbTextless1080.jpg?resize=1200:*"),

    ];

      getRecipes() {
        // Return a copy of the recipes
        return this.recipes.slice();
      }
}