import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent {

  @HostBinding('class.XSmall') iphoneMode = false;
  @HostBinding('class.small')  smartPhoneMode = false;
  @HostBinding('class.medium') tabletMode = false;
  @HostBinding ('class.large') pcMode = false;

  constructor(private breakpointObserver: BreakpointObserver){
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

  

}
