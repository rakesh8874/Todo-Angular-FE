import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding } from '@angular/core';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.css']
})
export class ShowProfileComponent {
  
  @HostBinding('class.XSmall') iphoneMode = false;
  @HostBinding('class.small')  smartPhoneMode = false;
  @HostBinding('class.medium') tabletMode = false;
  @HostBinding ('class.large') pcMode = false;

  usersData:any;
  userProfile:any;

  constructor(private user_reg:UserServiceService, private breakpointObserver: BreakpointObserver){
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
     this.usersData = this.user_reg.getUser();
     this.userProfile = this.usersData.profileImage;
  }

}
