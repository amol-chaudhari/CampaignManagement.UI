import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module'

import { MatVideoModule } from 'mat-video';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { AuthInterceptor } from './shared/guard/auth.interceptor';
import { UserService } from './shared/services/user.service';
import { CampaignService } from './shared/services/campaign.service';
import { SurveyService } from './shared/services/survey.service';
import { GroupService } from './shared/services/group.service';
import { VideoService } from './shared/services/video.service';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        MatVideoModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        NgbModule.forRoot(),
    ],
    declarations: [AppComponent],
    providers: [UserService, CampaignService, SurveyService, GroupService, VideoService, AuthGuard, NgbActiveModal,{
        provide : HTTP_INTERCEPTORS,
        useClass : AuthInterceptor,
        multi : true
      }],
    bootstrap: [AppComponent]
})
export class AppModule {}