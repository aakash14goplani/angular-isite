import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home-page/home-page.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { LegalNoticeComponent } from './legal-notice/legal-notice.component';
import { AccessibilityStatementComponent } from './accessibility-statement/accessibility-statement.component';


const routes: Routes = [
  {path: '', component: HomePageComponent },
  {path: 'home', component: HomePageComponent },
  {path: 'index', component: HomePageComponent },
  {path: 'privacy-policy', component: PrivacyPolicyComponent },
  {path: 'legal-notice', component: LegalNoticeComponent },
  {path: 'accessibility', component: AccessibilityStatementComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
