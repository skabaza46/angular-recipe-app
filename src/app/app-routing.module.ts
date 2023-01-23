import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipes/recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipes/recipe-start/recipe-start.component';
import { RecipesComponent } from './recipes/recipes.component';
import { RecipeResolverService } from './recipes/recipies-resolver.service';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';

const routes: Routes = [
  { path: "", redirectTo: "/recipes" , pathMatch: "full"},
  {
    path: "recipes",
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
    { path: "", component: RecipeStartComponent , resolve: [RecipeResolverService]},
    { path: "new", component: RecipeEditComponent},
    { path: ":id", component: RecipeDetailComponent, resolve: [RecipeResolverService]},
    { path: ":id/edit", component: RecipeEditComponent, resolve: [RecipeResolverService]},
  ] },
  { path: "shopping-list", component: ShoppingListComponent },
  { path: "auth", component: AuthComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
