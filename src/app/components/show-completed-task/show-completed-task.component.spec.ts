import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowCompletedTaskComponent } from './show-completed-task.component';

describe('ShowCompletedTaskComponent', () => {
  let component: ShowCompletedTaskComponent;
  let fixture: ComponentFixture<ShowCompletedTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowCompletedTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowCompletedTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
