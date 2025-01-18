import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeMachinesComponent } from './see-machines.component';

describe('SeeMachinesComponent', () => {
  let component: SeeMachinesComponent;
  let fixture: ComponentFixture<SeeMachinesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeeMachinesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeeMachinesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
