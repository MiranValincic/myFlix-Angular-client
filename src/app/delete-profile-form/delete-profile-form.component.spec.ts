import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteProfileFormComponent } from './delete-profile-form.component';

describe('DeleteProfileFormComponent', () => {
  let component: DeleteProfileFormComponent;
  let fixture: ComponentFixture<DeleteProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteProfileFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
