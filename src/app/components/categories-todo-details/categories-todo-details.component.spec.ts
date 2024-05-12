import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesTodoDetailsComponent } from './categories-todo-details.component';

describe('CategoriesTodoDetailsComponent', () => {
  let component: CategoriesTodoDetailsComponent;
  let fixture: ComponentFixture<CategoriesTodoDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoriesTodoDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesTodoDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
