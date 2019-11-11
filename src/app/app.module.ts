import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnauthHeaderComponent } from './unauth-header/unauth-header.component';
import { AuthHeaderComponent } from './auth-header/auth-header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { AccessibilityStatementComponent } from './accessibility-statement/accessibility-statement.component';

@NgModule({
  declarations: [
    AppComponent,
    UnauthHeaderComponent,
    AuthHeaderComponent,
    FooterComponent,
    HomePageComponent,
    PrivacyPolicyComponent,
    LegalNoticeComponent,
    AccessibilityStatementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
