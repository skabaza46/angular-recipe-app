import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent  implements OnInit{
  id: number;

  editMode: boolean = false;

  constructor(private route: ActivatedRoute) { };


  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=> {
        this.id = +params['id'];

        // Checking to see if the params has an id
        // if id is undefined, it will be in new mode
        this.editMode = params['id'] != null;

      }
    )
  }



}
