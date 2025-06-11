import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppVideoPresentationComponent } from './app-video-presentation.component';

describe('AppVideoPresentationComponent', () => {
  let component: AppVideoPresentationComponent;
  let fixture: ComponentFixture<AppVideoPresentationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppVideoPresentationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppVideoPresentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
