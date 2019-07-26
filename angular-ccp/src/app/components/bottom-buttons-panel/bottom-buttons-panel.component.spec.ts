import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomButtonsPanelComponent } from './bottom-buttons-panel.component';

describe('BottomButtonsPanelComponent', () => {
  let component: BottomButtonsPanelComponent;
  let fixture: ComponentFixture<BottomButtonsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomButtonsPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomButtonsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
