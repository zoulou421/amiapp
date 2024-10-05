import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SujetMemoireComponent } from './sujet-memoire.component';

describe('SujetMemoireComponent', () => {
  let component: SujetMemoireComponent;
  let fixture: ComponentFixture<SujetMemoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SujetMemoireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SujetMemoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
