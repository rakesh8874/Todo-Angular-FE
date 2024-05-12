import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { BannerComponent } from './components/banner/banner.component';
import { ResponsiveDirective } from './directives/responsive.directive';
import { FooterComponent } from './components/footer/footer.component';
import { SigninComponent } from './components/signin/signin.component';
import { LoginComponent } from './components/login/login.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {HttpClientModule} from '@angular/common/http';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatChipsModule} from '@angular/material/chips';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { AddTodoComponent } from './components/add-todo/add-todo.component';
import { ShowTaskComponent } from './components/show-task/show-task.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { ShowPrioritiesComponent } from './components/show-priorities/show-priorities.component';
import { ShowProfileComponent } from './components/show-profile/show-profile.component';
import { TodoDetailsComponent } from './components/todo-details/todo-details.component';
import { ShowCategoryDetailsComponent } from './components/show-category-details/show-category-details.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { UpdateTodoComponent } from './components/update-todo/update-todo.component';
import { ShowCompletedTaskComponent } from './components/show-completed-task/show-completed-task.component';
import { SearchComponent } from './components/search/search.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginUserComponent } from './components/login-user/login-user.component';
import { CompletedTaskComponent } from './components/completed-task/completed-task.component';
import { CategoriesTodoDetailsComponent } from './components/categories-todo-details/categories-todo-details.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ClickStopPropagationDirective } from './directives/click-stop-propagation.directive';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';
 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    BannerComponent,
    ResponsiveDirective,
    FooterComponent,
    SigninComponent,
    LoginComponent,
    UserDashboardComponent,
    AddTodoComponent,
    ShowTaskComponent,
    AddCategoryComponent,
    ShowPrioritiesComponent,
    ShowProfileComponent,
    TodoDetailsComponent,
    ShowCategoryDetailsComponent,
    UpdateUserComponent,
    UpdateTodoComponent,
    ShowCompletedTaskComponent,
    SearchComponent,
    SidebarComponent,
    PageNotFoundComponent,
    LoginUserComponent,
    CompletedTaskComponent,
    CategoriesTodoDetailsComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    ClickStopPropagationDirective,
    UpdatePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatToolbarModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    HttpClientModule,
    MatSnackBarModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatChipsModule,
    MatIconModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
