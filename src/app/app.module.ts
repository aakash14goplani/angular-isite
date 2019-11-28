import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UnauthHeaderComponent } from './unauth-header/unauth-header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { AccessibilityStatementComponent } from './accessibility-statement/accessibility-statement.component';
import { UserNameValidatorDirective } from './home-page/user-name-validator.directive';
import { PasswordValidatorDirective } from './home-page/password-validator.directive';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectPlanComponent } from './project-plan/project-plan.component';
import { FilterNSortComponent } from './shared/filter-n-sort/filter-n-sort.component';
import { FormatProjectContentsPipe } from './project-plan/format-project-contents.pipe';
import { LimitProjectContentsPipe } from './project-details/limit-project-contents.pipe';
import { ProjectPhotosComponent } from './project-photos/project-photos.component';
import { ProjectDprComponent } from './project-dpr/project-dpr.component';
import { EmailValidatorDirective } from './home-page/email-validator.directive';
import { ProjectMaterialInwardComponent } from './project-material-inward/project-material-inward.component';
import { ProjectFilesComponent } from './project-files/project-files.component';
import { ProjectTeamsComponent } from './project-teams/project-teams.component';
import { ProjectBgDetailsComponent } from './project-bg-details/project-bg-details.component';
import { TooltipDirective } from './home-page/tooltip.directive';
import { ProjectComponent } from './project/project.component';
import { HeaderComponent } from './header/header.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    UnauthHeaderComponent,
    FooterComponent,
    HomePageComponent,
    PrivacyPolicyComponent,
    LegalNoticeComponent,
    AccessibilityStatementComponent,
    UserNameValidatorDirective,
    PasswordValidatorDirective,
    ProjectDetailsComponent,
    ProjectPlanComponent,
    FilterNSortComponent,
    FormatProjectContentsPipe,
    LimitProjectContentsPipe,
    ProjectPhotosComponent,
    ProjectDprComponent,
    EmailValidatorDirective,
    ProjectMaterialInwardComponent,
    ProjectFilesComponent,
    ProjectTeamsComponent,
    ProjectBgDetailsComponent,
    TooltipDirective,
    ProjectComponent,
    HeaderComponent,
    UserProfileComponent
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
