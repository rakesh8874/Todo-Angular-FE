import { SafeUrl } from "@angular/platform-browser";

export interface Todo{
    archived: string;
    todoId:string;
    todoTitle:string;
    todoDesc:string;
    priorities:string;
    dueDate:Date;
    reminderDate:Date;
    completed:string;
   } 
   
   export interface Category{
       categoryId:string;
       categoryName:string;
   }

   export interface UserLogin{
    email:string;
    password:string;
}

export interface SignUp{
    fullName:string;
    email:string;
    password:string;
    confirmPassword:string;
}

export interface FileHandle{
    file:File,
    url: SafeUrl
}