import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  @HostBinding('class.XSmall') iphoneMode = false;
  @HostBinding('class.small')  smartPhoneMode = false;
  @HostBinding('class.medium') tabletMode = false;
  @HostBinding ('class.large') pcMode = false;
  
  //defining property to receve response after login
  resData:any = "";

  // injection snack bar form builder user registration service and router
  constructor(private snack:MatSnackBar, 
    private fb:FormBuilder, 
    private user_service:UserServiceService, 
    private router:Router, private dialog:MatDialog,
    private breakpointObserver: BreakpointObserver
    ){
      this.breakpointObserver
      .observe([Breakpoints.Medium, Breakpoints.Small,
         Breakpoints.XSmall, Breakpoints.Large])
      .subscribe({
        next: (result: any) => {
          for (let breakpoint of Object.keys(result.breakpoints))
            if (result.breakpoints[breakpoint]) {
              if (breakpoint === Breakpoints.XSmall){
                this.iphoneMode = true;
                this.smartPhoneMode = false;
                this.tabletMode = false;
                this.pcMode = false;
              }
  
              if (breakpoint === Breakpoints.Small){ 
                this.smartPhoneMode = true;
                this.tabletMode = false;
                this.iphoneMode = false;
                this.pcMode = false;
              }
  
              if (breakpoint === Breakpoints.Medium){ 
                this.smartPhoneMode = false;
                this.tabletMode = true;
                this.iphoneMode = false;
                this.pcMode = false;
              }
              if (breakpoint === Breakpoints.Large){ 
                this.smartPhoneMode = false;
                this.pcMode = true;
                this.tabletMode = false;
                this.iphoneMode = false;
              }
            }
        },
      });
    }
    
  ngOnInit(): void {
     
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(ForgotPasswordComponent, {
      enterAnimationDuration,
      exitAnimationDuration
    });
  }

    // defining structure of login form
  loginForm = this.fb.group(
    {
    email:['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)]],
    password:['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)]]
    }
  )


  // function for login
  onSubmit(){
      this.user_service.loginCheck(this.loginForm.value).subscribe(
        res=>{
          this.resData = res;
          this.user_service.loginUser(this.resData.token);
          Swal.fire(
            'Success',
            'You Have Logged In Successfully!',
            'success'
          )
          this.user_service.getCurrentUser().subscribe(
            (user:any)=>{
              this.user_service.setUser(user);
              if(this.user_service.isLoggedIn()){
              this.router.navigate(['userDashboard/task']);
              this.user_service.loginStatusSubject.next(true);
              }
            }
          )
         this.loginForm.reset();
         this.dialog.closeAll();
        },
        (error:any)=>{
          this.snack.open(
            "Invalid Credentials !!", "Ok",{
              duration:3000,
            });
        }
      )
  }

  // defining getter setter to apply validation
  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }

}
