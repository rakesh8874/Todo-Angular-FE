import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from 'src/app/services/user-service.service';
import { passwordValidators } from 'src/app/validators/password.validators';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent{

  @HostBinding('class.XSmall') iphoneMode = false;
  @HostBinding('class.small')  smartPhoneMode = false;
  @HostBinding('class.medium') tabletMode = false;
  @HostBinding ('class.large') pcMode = false;

 //property for setting profile img
 url:string='../../../assets/user-file.jpg';
  

 //property for adding profile picture
 userFile1:any = File;
 userFile2:any = File;


 showEmailField:boolean = true;

 showOtpBtn:boolean = false;

 openForm:boolean = false;

 hidebutton:boolean = false;

 showOtpField:boolean = false;


 showRemainingForm:boolean = false;

 storeEmail:string[] = [];

 otp:any;
 

 //injecting snakbar, form builder, and user registration service
 constructor(private snak:MatSnackBar, 
   private fb:FormBuilder, 
   private user_reg:UserServiceService,
   private matDialog:MatDialog,
   private breakpointObserver: BreakpointObserver
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

   // defining structure of signin form
 signInForm = this.fb.group({
   profileImage:[''],
   fullName:['',[Validators.required]],
   email:['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)]],
   contactNo:['',[Validators.required,Validators.pattern(/^[789]\d{9}$/)]],
   password:['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)]],
   confirmPassword:['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{5,}$/)]]
 },{validators:passwordValidators});

 // function to select file from system
 onFileSelect(file:any){
 if(file.target.files){
   const reader=new FileReader();
   reader.readAsDataURL(file.target.files[0]);
   reader.onload=(event:any)=>{
     this.url=event.target.result;
   }
 }
 const filedata=file.target.files[0];
  
}

// function to submit registraiton form 
onSubmit(){
   this.user_reg.registerUser({
     profileImage:this.url,
     fullName:this.fullName?.value,
     email:this.email?.value,
     contactNo:this.contactNo?.value,
     password:this.password?.value,
     confirmPassword:this.confirmPassword?.value
   }).subscribe(
     response=>{
      Swal.fire(
        'Success',
        'You Have Registred Successfully!',
        'success'
      )
      this.signInForm.reset();
      this.matDialog.closeAll();
     },
     error=>{
      this.snak.open(
        "Something Went Wrong Seems Already Registered !!", "Ok",{
          duration:3000,
        });
     }
     )
}

checkEmail(emailid:any){
  if(emailid){
      this.hidebutton = true;
  }else if(!emailid){
    this.hidebutton = false;
  }
}

sentOtp(emailId:string){
   this.user_reg.generateOtp(emailId).subscribe(
    response=>{
     this.otp = response;
    
     if(this.otp){
     this.showOtpField = true;
     Swal.fire(
      'Success',
      'Otp Sent On Your Mail Successfully!',
      'success'
    )
     }else{
      this.showOtpField = false;
     }
    }
   )
}

verifyOtp(otp:string){
  if(this.otp == otp){
    this.openForm = true;
    this.showOtpField = false;
    this.showEmailField = false;
  }else{
    this.openForm = false;
  }
}

// defining getters to set validations

get fullName(){
 return this.signInForm.get('fullName');
} 

get email(){
 return this.signInForm.get('email');
} 

get password(){
 return this.signInForm.get('password');
} 

get confirmPassword(){
 return this.signInForm.get('confirmPassword');
} 

get contactNo(){
 return this.signInForm.get('contactNo');
}

}
