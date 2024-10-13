import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendezvousListComponent } from './rendezvous-list.component';

describe('RendezvousListComponent', () => {
  let component: RendezvousListComponent;
  let fixture: ComponentFixture<RendezvousListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendezvousListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RendezvousListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
