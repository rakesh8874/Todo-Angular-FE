import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent implements OnInit{

  @HostBinding('class.XSmall') iphoneMode = false;
  @HostBinding('class.small')  smartPhoneMode = false;
  @HostBinding('class.medium') tabletMode = false;
  @HostBinding ('class.large') pcMode = false;
  

  otp1:boolean = false;

  otp2:boolean = false;

  otp3:any;

  useremail:any;

  storeEmail:string[] = [];


  allUsers:any;

  constructor(private user:UserServiceService,
     private snak:MatSnackBar,
      private breakpointObserver: BreakpointObserver)
     {
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
    this.user.getAllUser().subscribe(
      response=>{
          this.allUsers = response;
          for(let item of this.allUsers){
            this.storeEmail.push(item.email);
          }
      }
    )
  }


  generateOtp(email:string){
    let flag = false;
    for(let item of this.storeEmail){
      if(email===item){
        this.useremail = email;
        flag = true;
        break;
      }
    }
      if(flag){
        this.user.generateOtp(email).subscribe(
          response=>{
             this.otp3 = response;
             localStorage.setItem('otp', this.otp3);
            Swal.fire("Success","Otp Sent On Your Email Id", "success");
            this.otp1 = true;
          },
          error=>{
            console.log(error);
          }
         )
      }else{
        this.snak.open(
          "Provide Valid Email !!", "Ok",{
            duration:5000,
          });
      }
   }

   enterOtp(otp:string){
     if(otp==this.otp3){
      this.otp2 = true;
     }
   }



}
