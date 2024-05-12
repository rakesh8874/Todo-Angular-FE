import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(private fb:FormBuilder){}

  moveToHeader(){
    document.getElementById("header")?.scrollIntoView({behavior:"smooth"});
  }

  contactForm = this.fb.group(
    {
    email:['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)]],
    message:['', [Validators.required, Validators.minLength(10)]]
    }
  )

  get email(){
    return this.contactForm.get('email');
  }

  get message(){
    return this.contactForm.get('message');
  }


}
