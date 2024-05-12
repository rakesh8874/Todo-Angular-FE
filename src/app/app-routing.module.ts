import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { CategoriesTodoDetailsComponent } from './components/categories-todo-details/categories-todo-details.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { CompletedTaskComponent } from './components/completed-task/completed-task.component';
import { HomeComponent } from './components/home/home.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ShowCategoryDetailsComponent } from './components/show-category-details/show-category-details.component';
import { ShowCompletedTaskComponent } from './components/show-completed-task/show-completed-task.component';
import { ShowPrioritiesComponent } from './components/show-priorities/show-priorities.component';
import { ShowProfileComponent } from './components/show-profile/show-profile.component';
import { ShowTaskComponent } from './components/show-task/show-task.component';
import { SigninComponent } from './components/signin/signin.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
import { UpdateTodoComponent } from './components/update-todo/update-todo.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { UpdatePasswordGuard } from './guards/update-password.guard';

const routes: Routes = [
 {
  path:'home',
  component:HomeComponent
 },
 {
  path:'',redirectTo:'/home', pathMatch:'full'
 },
 {
  path:'login',
  component:LoginUserComponent
},
{
canActivate:[UpdatePasswordGuard],
path:'update-password/:id',
component:ChangePasswordComponent
},
{
path:'update-password',
component:UpdatePasswordComponent
},
{
  path:'signIn',
  component:SigninComponent
},
{
  path:'userDashboard',                         
  canActivate:[AuthGuard],
  component:UserDashboardComponent,
  children:[
    {
      path:'addTodo',
      component:AddTodoComponent
    },
    {
      path:'task',
      component:ShowTaskComponent
    },
    {
      path:'add-category',
      component:AddCategoryComponent
    },
    {
      path:'show-priority',
      component:ShowPrioritiesComponent
    },
    {
      path:'show-profile',
      component:ShowProfileComponent
    },
    {
    path:'todo-details/:todoId',
    component:TodoDetailsComponent
    },
    {
      path:'show-category-details/:name',
      component:ShowCategoryDetailsComponent
    },
    {
      path:'update-user/:id',
      component:UpdateUserComponent
    },
    {
      path:'update-todo/:id',
      component:UpdateTodoComponent
    },
    {
      path:'completed-task',
      component:ShowCompletedTaskComponent
    },
    {
      path:'archived-task',
      component:CompletedTaskComponent
    },
    {
      path:'category-todo-details/:todoId/:categoryName',
      component:CategoriesTodoDetailsComponent
    }
  ]
},
{
  path:'**',
  component:PageNotFoundComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
