import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { AccessibilityStatementComponent } from './accessibility-statement/accessibility-statement.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { ProjectPlanComponent } from './project-plan/project-plan.component';
import { ProjectPhotosComponent } from './project-photos/project-photos.component';
import { ProjectDprComponent } from './project-dpr/project-dpr.component';
import { ProjectMaterialInwardComponent } from './project-material-inward/project-material-inward.component';
import { ProjectFilesComponent } from './project-files/project-files.component';
import { ProjectTeamsComponent } from './project-teams/project-teams.component';
import { ProjectBgDetailsComponent } from './project-bg-details/project-bg-details.component';
import { ProjectComponent } from './project/project.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuardService } from './authentication/auth-guard.service';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { ProjectDetailsResolverService } from './project-details/project-details-resolver.service';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'index', component: HomePageComponent },
  { path: 'project', component: ProjectComponent, canActivateChild: [ AuthGuardService ],
    children: [
      { path: '', redirectTo: 'details', pathMatch: 'full', resolve: [ProjectDetailsResolverService] },
      { path: 'details', component: ProjectDetailsComponent, resolve: [ProjectDetailsResolverService] },
      { path: 'plan', component: ProjectPlanComponent },
      { path: 'photos', component: ProjectPhotosComponent },
      { path: 'dpr', component: ProjectDprComponent },
      { path: 'material-inward', component: ProjectMaterialInwardComponent },
      { path: 'files', component: ProjectFilesComponent },
      { path: 'teams', component: ProjectTeamsComponent },
      { path: 'bg-details', component: ProjectBgDetailsComponent }
    ]
  },
  { path: 'my-account', component: UserProfileComponent, canActivate: [ AuthGuardService ] },
  { path: 'privacy-policy', component: PrivacyPolicyComponent },
  { path: 'legal-notice', component: LegalNoticeComponent },
  { path: 'accessibility', component: AccessibilityStatementComponent },
  { path: 'page-not-found', component: PageNotFoundComponent, data: {message: 'This is not the page you were looking for...'} },
  { path: '**', redirectTo: 'page-not-found' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
