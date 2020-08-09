import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryOptionsComponent } from './category-options.component';

describe('CategoryOptionsComponent', () => {
  let component: CategoryOptionsComponent;
  let fixture: ComponentFixture<CategoryOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
