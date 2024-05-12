import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Category } from 'src/app/models/datatypes';
import { navbarData } from 'src/app/models/side-nav';
import { TodoServiceService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  
//defining array to store all categories
allCategoryDetails:Category[] = [];

 

// defining property to show priority option
showPriorites:boolean = false;

//defining property to show category div
showCategoryDiv:boolean = false;

menu_icon_variable:boolean = false;


menuVariable:boolean = false;

//injecting todo serivce
constructor(private todo:TodoServiceService){}

//get all the categories
ngOnInit(): void {
  
}


openMenu(){
  this.menuVariable =! this.menuVariable;
}

}
