import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';
 
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit{

  otp1:boolean = false;

  otp2:boolean = false;

  otp3:any;

  useremail:any;

  storeEmail:string[] = [];


  allUsers:any;

  constructor( private user:UserServiceService,
     public dialog:MatDialog, private snak:MatSnackBar, private router:Router){}

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
          "Provide Valid Email !!", "OK",{
            duration:5000,
          });
      }
   }

   enterOtp(otp:string){
     if(otp==this.otp3){
      this.otp2 = true;
     }
   }


  closeDialog(){
    this.dialog.closeAll();
  }

}
