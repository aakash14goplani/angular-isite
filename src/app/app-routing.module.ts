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


const routes: Routes = [
  {path: '', component: HomePageComponent },
  {path: 'home', component: HomePageComponent },
  {path: 'index', component: HomePageComponent },
  {path: 'project-details', component: ProjectDetailsComponent },
  {path: 'project-plan', component: ProjectPlanComponent },
  {path: 'project-photos', component: ProjectPhotosComponent },
  {path: 'project-dpr', component: ProjectDprComponent },
  {path: 'privacy-policy', component: PrivacyPolicyComponent },
  {path: 'legal-notice', component: LegalNoticeComponent },
  {path: 'accessibility', component: AccessibilityStatementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
