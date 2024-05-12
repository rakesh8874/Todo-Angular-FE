import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { passwordValidators } from 'src/app/validators/password.validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit{

  @HostBinding('class.XSmall') iphoneMode = false;
  @HostBinding('class.small')  smartPhoneMode = false;
  @HostBinding('class.medium') tabletMode = false;
  @HostBinding ('class.large') pcMode = false;

  userEmail:any;
 
constructor(private fb:FormBuilder,
   private user:UserServiceService,
   private router:Router,
   private dialog:MatDialog,
   private activatedRoute:ActivatedRoute,
   private breakpointObserver: BreakpointObserver,
   private snak:MatSnackBar
   ){

    this.breakpointObserver
    .observe([Breakpoints.Medium, Breakpoints.Small, Breakpoints.XSmall, Breakpoints.Large])
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
    this.userEmail = this.activatedRoute.snapshot.paramMap.get("id");
  }

  updatePasswordForm = this.fb.group(
    {
      email:[''],
      password:['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)]],
      confirmPassword:['',[Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)]]
    }, {validators:passwordValidators}
  );

  onSubmit(){
    this.updatePasswordForm.value.email = this.userEmail;
     this.user.changePassword(this.updatePasswordForm.value, 
      this.userEmail).subscribe(
      response=>{
        Swal.fire("Success", "Your Password Changed Sucessfully, Please LogIn", 'success');
        this.router.navigate(['login']);
        this.dialog.closeAll();
      },
      error=>{
        this.snak.open(
          "Something Went Wrong !!", "Ok",{
            duration:3000,
          });
      }
     )
  }

  get password(){
    return this.updatePasswordForm.get('password');
  }

  get confirmPassword(){
    return this.updatePasswordForm.get('confirmPassword');
  }

  get email(){
    return this.updatePasswordForm.get('email');
  }

}