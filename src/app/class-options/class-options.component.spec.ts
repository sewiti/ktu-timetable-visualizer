import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassOptionsComponent } from './class-options.component';

describe('ClassOptionsComponent', () => {
  let component: ClassOptionsComponent;
  let fixture: ComponentFixture<ClassOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
