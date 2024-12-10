import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaalumnosPage } from './listaalumnos.page';

describe('ListaalumnosPage', () => {
  let component: ListaalumnosPage;
  let fixture: ComponentFixture<ListaalumnosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaalumnosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
