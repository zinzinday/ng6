import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingReferenceComponent } from './setting-reference.component';

describe('SettingReferenceComponent', () => {
  let component: SettingReferenceComponent;
  let fixture: ComponentFixture<SettingReferenceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingReferenceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingReferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
