import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent  implements OnInit{
  id: number;
  editMode: boolean = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService) { };


  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=> {
        this.id = +params['id'];

        // Checking to see if the params has an id
        // if id is undefined, it will be in new mode
        this.editMode = params['id'] != null;

        this.initForm();

      }
    )
  }

  onSubmit() {
    console.log(this.recipeForm);
  }

  private initForm(){
    let recipeName: string = "";
    let recipeImagePath: string = "";
    let recipeDescription: string = "";
    let recipeIngredients = new FormArray([]);


    if (this.editMode){
      const recipe = this.recipeService.getRecipe(this.id);

      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      if (recipe["ingredients"]){

        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name),
              'amount': new FormControl(ingredient.amount),
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      "name": new FormControl(recipeName),
      "imagePath": new FormControl(recipeImagePath),
      "description": new FormControl(recipeDescription),
      "ingredients": recipeIngredients

    });
  }



}
