import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VideostreamingPage } from './videostreaming.page';

describe('VideostreamingPage', () => {
  let component: VideostreamingPage;
  let fixture: ComponentFixture<VideostreamingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VideostreamingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
