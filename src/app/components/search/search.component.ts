import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
//sending date to parent component using output decorator
@Output()
eventProperty: EventEmitter<string> = new EventEmitter<string>();

todoTitle: string = "";

// method to search todo
searchTodo() {
  this.eventProperty.emit(this.todoTitle);
}

}
