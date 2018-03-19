import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplemapComponent } from './simplemap.component';

describe('SimplemapComponent', () => {
  let component: SimplemapComponent;
  let fixture: ComponentFixture<SimplemapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplemapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplemapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
