import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemoignagesComponent } from './temoignages.component';

describe('TemoignagesComponent', () => {
  let component: TemoignagesComponent;
  let fixture: ComponentFixture<TemoignagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemoignagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TemoignagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
