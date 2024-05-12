import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Todo } from 'src/app/models/datatypes';
import { TodoServiceService } from 'src/app/services/todo-service.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.css']
})
export class ShowTaskComponent {

  @HostBinding('class.XSmall') iphoneMode = false;
  @HostBinding('class.small')  smartPhoneMode = false;
  @HostBinding('class.medium') tabletMode = false;
  @HostBinding ('class.large') pcMode = false;
//defining property to get all the todos

allTaskDetails:Todo[] = [];

// defining property to change div in view
 showWelcomeMsg:boolean = false;

// defining property to change div in view
 showMainContainer:boolean = false;

// show username while loging in
userName:string = '';


//property To Get Todo
singleTodo:any = "";

//storing page slice
pageSlice:any;


// injecting todod service to call methods from todo service
 constructor(private todo:TodoServiceService, 
  private snak:MatSnackBar,
  private fb:FormBuilder,
  private user_reg:UserServiceService,
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

//getting all todos to show in inbox

ngOnInit(): void {
  this.getAllTodosFromList();
  let users = this.user_reg.getUser();
 this.userName = users.fullName;
}

 

//function to get All The Todos

getAllTodosFromList(){
  this.todo.getAllTasks().subscribe(

    response=>{
      
      this.allTaskDetails = response;

      if(this.allTaskDetails === null){

        this.showWelcomeMsg = true;

      }else if(this.allTaskDetails !== null){

        this.showMainContainer = true;
      }

      if(this.allTaskDetails.length === 0){

        this.showWelcomeMsg = true;

      }else if(this.allTaskDetails.length !== 0){
        this.showMainContainer = true;
      }

      this.pageSlice = this.allTaskDetails.slice(0, 9);

      if(this.pageSlice.length === 0 && this.showMainContainer){
        this.showMainContainer = false;
      }else if(this.pageSlice.length !== 0 && this.showWelcomeMsg){
        this.showWelcomeMsg = false;
      }

    },
    error=>{
      this.snak.open("Something went Wrong !!", "Ok",{
        duration:3000,
      });
    }
   )
}


//  form to add todo
todoAddForm = this.fb.group(
  {
   todoTitle:[this.singleTodo?.todoTitle,[Validators.required]],
   todoDesc:[this.singleTodo?.todoDesc]
  }
)


//function to search todos 

searchOnText(todoTitle:string){
  this.todo.getAllTasks().subscribe({
    next: todos => {
      if(todoTitle == null || todoTitle !== "") {
        this.pageSlice = todos.filter(todo => todo.todoTitle?.toLowerCase()
        .includes(todoTitle.toLowerCase()));
      } else {
        this.pageSlice = todos;
      }
    },
    error: e => {
      this.snak.open("Something went Wrong !!", "Ok",{
        duration:3000,
      });
    }
  })
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
        this.getAllTodosFromList();
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
    this.getAllTodosFromList();
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
            this.getAllTodosFromList();
          }
        )
      },
      error=>{
        console.log(error);
        this.snak.open("Something went Wrong !!", "Ok",{
          duration:3000,
        });
      }
     )
}

onPageChange(event:PageEvent){
  console.log(event);
   const startIndex = event.pageIndex*event.pageSize;
   let endIndex = startIndex + event.pageSize;
   if(endIndex > this.allTaskDetails.length){
    endIndex = this.allTaskDetails.length;
   }
   this.pageSlice = this.allTaskDetails.slice(startIndex, endIndex);
}
}
