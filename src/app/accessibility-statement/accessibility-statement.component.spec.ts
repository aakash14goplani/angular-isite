import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from '../authentication/auth.service';
import { UserService } from '../core/user-service/user-service.service';
import { HeaderComponent } from '../header/header.component';
import { UnauthHeaderComponent } from '../unauth-header/unauth-header.component';
import { FooterComponent } from '../footer/footer.component';
import { AccessibilityStatementComponent } from './accessibility-statement.component';
import { routes } from '../app-routing.module';

fdescribe('AccessibilityStatementComponent', () => {
  let component: AccessibilityStatementComponent;
  let fixture: ComponentFixture<AccessibilityStatementComponent>;
  let mockAuthService, mockUserService;
  let router: Router;

  beforeEach(async(() => {
    mockAuthService = jasmine.createSpyObj(['user', 'getUsers']);
    mockUserService= jasmine.createSpyObj(['checkEmailPasswordCombination', 'setUserData', 'getUserName']);

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes)
      ],
      declarations: [
        AccessibilityStatementComponent,
        HeaderComponent,
        UnauthHeaderComponent,
        FooterComponent
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: UserService, useValue: mockUserService }
      ]
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(AccessibilityStatementComponent);
      component = fixture.componentInstance;
      router = TestBed.get(Router);
    });
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display auth-header to authenticated users', () => {
    component.isUserLoggedIn = true;
    mockAuthService.getUsers.and.returnValue(of(true));
    fixture.detectChanges();
    
    let headerComponentdebugElements = fixture.debugElement.query(By.directive(HeaderComponent));
    
    expect(headerComponentdebugElements.componentInstance).toBeTruthy();
  });

  it('should display un-auth-header to un-authenticated users', () => {
    component.isUserLoggedIn = false;
    mockAuthService.getUsers.and.returnValue(of(false));
    fixture.detectChanges();
    
    let headerComponentdebugElements = fixture.debugElement.query(By.directive(UnauthHeaderComponent));
    
    expect(headerComponentdebugElements.componentInstance).toBeTruthy();
  });
});
