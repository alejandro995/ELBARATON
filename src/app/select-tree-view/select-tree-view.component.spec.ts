import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTreeViewComponent } from './select-tree-view.component';

describe('SelectTreeViewComponent', () => {
  let component: SelectTreeViewComponent;
  let fixture: ComponentFixture<SelectTreeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTreeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTreeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
