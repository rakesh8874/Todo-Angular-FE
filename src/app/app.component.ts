import { Component } from '@angular/core';
import { ResponsiveDirective } from './directives/responsive.directive';

interface SideNavToggle{
  screenWidth:number;
  collapsed:boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo-App';

  isSideNavCollapsed:boolean = false;
  screenWidth=0;

  onToggleSideNav(data:SideNavToggle){
      this.screenWidth = data.screenWidth;
      this.isSideNavCollapsed = data.collapsed;
  }
}
