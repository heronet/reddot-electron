import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalPostsComponent } from './personal-posts.component';

describe('PersonalPostsComponent', () => {
  let component: PersonalPostsComponent;
  let fixture: ComponentFixture<PersonalPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalPostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
