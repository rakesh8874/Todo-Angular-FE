import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { LoginComponent } from '../login/login.component';
import { SigninComponent } from '../signin/signin.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isLoggedIn:boolean = false;   

  users:any;

  seeDetails:boolean = false;
 
  menuVariable:boolean = false;
 
  menuOption:boolean = false;
 
  menu_icon_variable:boolean = false;
 

  constructor(public dialog: MatDialog,
    public user:UserServiceService, 
    private router:Router){}

 
 ngOnInit(): void {
   this.isLoggedIn = this.user.isLoggedIn();
   this.users = this.user.getUser();
   this.user.loginStatusSubject.asObservable().subscribe((data:any)=>{
     this.isLoggedIn = this.user.isLoggedIn();
     this.users = this.user.getUser();
   })
 }

 openMenu(){
    this.menuVariable =! this.menuVariable;
    this.menu_icon_variable =! this.menu_icon_variable;
 }

 openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
   this.dialog.open(LoginComponent, {
     enterAnimationDuration,
     exitAnimationDuration
   });
 }

 openDialogSignIn(enterAnimationDuration: string, exitAnimationDuration: string): void {
   this.dialog.open(SigninComponent, {
     enterAnimationDuration,
     exitAnimationDuration
   });
 }

 logoutUser(){
   this.user.logout();
   this.user.loginStatusSubject.next(false);
   this.router.navigate(['home']);
 }
 showDetails(){
   if(!this.seeDetails){
    this.seeDetails = true;
   }else{
     this.seeDetails = false;
   }  
}

toAbout(){
 document.getElementById("footer")?.scrollIntoView({behavior:"smooth"});
}


toContact(){
 document.getElementById("footer")?.scrollIntoView({behavior:"smooth"});
}

}
