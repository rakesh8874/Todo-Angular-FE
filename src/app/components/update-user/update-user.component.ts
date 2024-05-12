import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent {

  @HostBinding('class.XSmall') iphoneMode = false;
  @HostBinding('class.small')  smartPhoneMode = false;
  @HostBinding('class.medium') tabletMode = false;
  @HostBinding ('class.large') pcMode = false;
//properth to get users details;
users:any;

//property for setting profile img
url:string='../../../assets/user-file.jpg';


//property for adding profile picture
userFile1:any = File;
userFile2:any = File;

//injecting snakbar form builder, and user registration service
constructor(private snak:MatSnackBar, 
  private fb:FormBuilder, 
  private user_reg:UserServiceService,
  private activeRoute:ActivatedRoute,
  private router:Router,
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
  this.activeRoute.snapshot.paramMap.get('id');
  this.users = this.user_reg.getUser();
 }

  // defining structure of signin form
  updateUserForm = this.fb.group({
  profileImage:[''],
  fullName:['',[Validators.required]],
  email:['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)]],
  contactNo:['',[Validators.required,Validators.pattern(/^[789]\d{9}$/)]],
});

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
console.log(filedata);
console.log(file);
}

// function to submit registraiton form 
onSubmit(){
  this.user_reg.updateUser({
    profileImage:this.url,
    fullName:this.fullName?.value,
    email:this.email?.value,
    contactNo:this.contactNo?.value,
  }).subscribe({
    next:(data:any)=>{
      this.user_reg.setUser(data);
      Swal.fire(
        'Success',
        'You Have Updated Your Details Successfully!',
        'success'
      )
      this.router.navigate(['userDashboard/show-profile']);
      this.user_reg.loginStatusSubject.next(true);
    }
  })
}

//defining getters to set validations

get fullName(){
return this.updateUserForm.get('fullName');
} 

get email(){
return this.updateUserForm.get('email');
} 

get contactNo(){
return this.updateUserForm.get('contactNo');
}
}
