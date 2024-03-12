import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthotpComponent } from './authotp.component';

describe('AuthotpComponent', () => {
  let component: AuthotpComponent;
  let fixture: ComponentFixture<AuthotpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthotpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
