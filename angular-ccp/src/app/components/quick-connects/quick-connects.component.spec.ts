import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickConnectsComponent } from './quick-connects.component';

describe('QuickConnectsComponent', () => {
  let component: QuickConnectsComponent;
  let fixture: ComponentFixture<QuickConnectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuickConnectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickConnectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
