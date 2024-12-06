import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RadioStreamingPage } from './radio-streaming.page';

describe('RadioStreamingPage', () => {
  let component: RadioStreamingPage;
  let fixture: ComponentFixture<RadioStreamingPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(RadioStreamingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
