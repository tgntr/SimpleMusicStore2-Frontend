import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FollowedLabelsComponent } from './followed-labels.component';

describe('FollowedLabelsComponent', () => {
  let component: FollowedLabelsComponent;
  let fixture: ComponentFixture<FollowedLabelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FollowedLabelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FollowedLabelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
