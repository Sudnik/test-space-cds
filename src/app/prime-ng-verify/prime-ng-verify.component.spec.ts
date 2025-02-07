import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimeNgVerifyComponent } from './prime-ng-verify.component';

describe('PrimeNgVerifyComponent', () => {
  let component: PrimeNgVerifyComponent;
  let fixture: ComponentFixture<PrimeNgVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeNgVerifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeNgVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
