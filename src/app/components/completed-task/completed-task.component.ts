import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from 'src/app/models/datatypes';
import { TodoServiceService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-completed-task',
  templateUrl: './completed-task.component.html',
  styleUrls: ['./completed-task.component.css']
})
export class CompletedTaskComponent implements OnInit {

  @HostBinding('class.XSmall') iphoneMode = false;
  @HostBinding('class.small')  smartPhoneMode = false;
  @HostBinding('class.medium') tabletMode = false;
  @HostBinding ('class.large') pcMode = false;

//definin property to hide and show completed task div
showMsgArchive:boolean = false;
  
showArchive:boolean = false;

completeTask:Todo[] = [];

pageSlice:any;

constructor(private todo:TodoServiceService,
   private snak:MatSnackBar,
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

ngOnInit(): void {
   this.showArchivedTasks();
}


showArchivedTasks(){
  this.todo.showArchivedTask().subscribe(
    result=>{
      this.completeTask = result;

      if(this.completeTask === null){

        this.showMsgArchive = true;

      }else if(this.completeTask !== null){

        this.showArchive = true;
      }

      if(this.completeTask.length === 0){

        this.showMsgArchive = true;

      }else if(this.completeTask.length !== 0){
        this.showArchive = true;
      }

      this.pageSlice = this.completeTask.slice(0, 9);

      if(this.pageSlice.length === 0 && this.showArchive){
        this.showArchive = false;
      }else if(this.pageSlice.length !== 0 && this.showMsgArchive){
        this.showMsgArchive = false;
      }
    }
   )
}



onPageChange(event:PageEvent){
  console.log(event);
   const startIndex = event.pageIndex*event.pageSize;
   let endIndex = startIndex + event.pageSize;
   if(endIndex > this.completeTask.length){
    endIndex = this.completeTask.length;
   }
   this.pageSlice = this.completeTask.slice(startIndex, endIndex);
}

}
