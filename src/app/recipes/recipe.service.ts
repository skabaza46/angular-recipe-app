import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
      new Recipe(
        "Tasty Schnitzel",
        "A super-tasty Schnitzel - just awesome!",
        "https://insanelygoodrecipes.com/wp-content/uploads/2022/03/Homemade-Pork-Schnitzel-with-Cauliflower-and-Lemons.jpg",
        [
          new Ingredient('Meat', 1),
          new Ingredient('French Fries', 20),
        ]),
      new Recipe(
        "Big Fat Burger",
        "What else you need to say ?",
        "https://i.insider.com/5a85feb142e1cc26ea3e9afb?width=600&format=jpeg&auto=webp",
        [
          new Ingredient('Buns', 2),
          new Ingredient('Meat', 1),
        ]),

    ];

    constructor(private shoppingListService: ShoppingListService){};

    setRecipes(recipes: Recipe[]){
      this.recipes = recipes;
      this.recipesChanged.next(this.recipes.slice());
    }

    getRecipe(index:number){
      return this.recipes[index];
    }

    getRecipes() {
      // Return a copy of the recipes
      return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
      this.shoppingListService.addIngredients(ingredients);
    }

    addRecipe(recipe: Recipe){
      this.recipes.push(recipe);
      this.recipesChanged.next(this.recipes.slice());
    }

    updateRecipe(index: number, newRecipe: Recipe){
      this.recipes[index] = newRecipe;
      this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
      this.recipes.splice(index, 1);
      this.recipesChanged.next(this.recipes.slice());
    }
}