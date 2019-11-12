import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnauthHeaderComponent } from './unauth-header/unauth-header.component';
import { AuthHeaderComponent } from './auth-header/auth-header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { AccessibilityStatementComponent } from './accessibility-statement/accessibility-statement.component';
import { UserNameValidatorDirective } from './home-page/user-name-validator.directive';
import { PasswordValidatorDirective } from './home-page/password-validator.directive';

@NgModule({
  declarations: [
    AppComponent,
    UnauthHeaderComponent,
    AuthHeaderComponent,
    FooterComponent,
    HomePageComponent,
    PrivacyPolicyComponent,
    LegalNoticeComponent,
    AccessibilityStatementComponent,
    UserNameValidatorDirective,
    PasswordValidatorDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
