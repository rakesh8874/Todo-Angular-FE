import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Todo } from 'src/app/models/datatypes';
import { TodoServiceService } from 'src/app/services/todo-service.service';

@Component({
  selector: 'app-todo-details',
  templateUrl: './todo-details.component.html',
  styleUrls: ['./todo-details.component.css']
})
export class TodoDetailsComponent {

  @HostBinding('class.XSmall') iphoneMode = false;
  @HostBinding('class.small')  smartPhoneMode = false;
  @HostBinding('class.medium') tabletMode = false;
  @HostBinding ('class.large') pcMode = false;

// defining array to get all the todos
todos:undefined | Todo[];

// defining property to store individual todo
individualTodo:any;

//injecting activate route and todo service
constructor(private activeRoute:ActivatedRoute, 
  private todo:TodoServiceService,
  private snak:MatSnackBar,
  private router:Router,
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

//getting todos
ngOnInit(): void {
  this.getAllTaskFromList();
}

getAllTaskFromList(){
  let todoId = this.activeRoute.snapshot.paramMap.get('todoId');
  todoId && this.todo.getAllTasks().subscribe(
   result=>{
     console.log(result);
      this.todos = result;
      for(let todo of this.todos){
       if(todo.todoId === todoId){
         this.individualTodo = todo;
         break;
       }
      }
   },
   error=>{
     console.log(error);
   }
   
  )
}

//function to getTodos and add into archive

addTodosIntoArchive(todo:Todo, todoId:string){
  this.todo.addTodosIntoArchived(todo).subscribe(
   result=>{
     this.todo.deleteTodos(todoId).subscribe(
       result=>{
         this.snak.open("1 Task Archived !!", "ok",{
           duration:3000,
         });
         this.router.navigate(["/userDashboard/task"]);
       }
     )
   },
   error=>{
     this.snak.open("Something went Wrong !!", "Ok",{
       duration:3000,
     });
   }
 )
 }
 
 // function to delete todo
 
 deleteTodos(todoId:string){
 this.todo.deleteTodos(todoId).subscribe(
   result=>{
     this.snak.open("1 Todo Deleted !!", "ok",{
       duration:3000,
     });
     this.router.navigate(["userDashboard/task"]);
   }
 )
 }
 
 addTodosIntoArchiveCompleted(task:Todo, taskId:string){
      this.todo.addTodosIntoCompleted(task).subscribe(
       result=>{
         this.todo.deleteTodos(taskId).subscribe(
           result=>{
             this.snak.open("1 Task Completed !!", "ok",{
               duration:3000,
             });
              
           }
         )
         this.router.navigate(["userDashboard/task"]);
       },
       error=>{
         console.log(error);
         this.snak.open("Something went Wrong !!", "Ok",{
           duration:3000,
         });
       }
      )
 }
}
