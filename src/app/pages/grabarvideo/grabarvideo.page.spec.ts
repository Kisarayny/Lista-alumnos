import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GrabarvideoPage } from './grabarvideo.page';

describe('GrabarvideoPage', () => {
  let component: GrabarvideoPage;
  let fixture: ComponentFixture<GrabarvideoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GrabarvideoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
