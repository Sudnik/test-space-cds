import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D3VerifyComponent } from './d3-verify.component';

describe('D3VerifyComponent', () => {
  let component: D3VerifyComponent;
  let fixture: ComponentFixture<D3VerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [D3VerifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(D3VerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
