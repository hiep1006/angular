import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDeleteComponent } from './notification-delete.component';

describe('NotificationDeleteComponent', () => {
  let component: NotificationDeleteComponent;
  let fixture: ComponentFixture<NotificationDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
