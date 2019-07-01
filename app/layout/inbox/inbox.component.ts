import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { routerTransition } from '../../router.animations';
import { UserCampaign } from '../../shared/models/campaign.model';
import { CampaignService } from '../../shared/services/campaign.service';
import { SurveyService } from '../../shared/services/survey.service';
import { VideoService } from '../../shared/services/video.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Video } from '../../shared/models/video.model';
import { Survey, UserAnswer } from '../../shared/models/survey.model';

@Component({
    selector: 'app-inbox',
    templateUrl: './inbox.component.html',
    styleUrls: ['./inbox.component.scss'],
    animations: [routerTransition()]
})
export class InboxComponent implements OnInit {
    enableSurvey: boolean = false;
    enableSurveySubmit: boolean = true;
    userCampaigns: UserCampaign[];
    userCampaign: UserCampaign;
    survey: Survey;
    videos: Video[];
    modalRef: any;
    videoSource: string = "";
    message: string ="";
    startTime: number;
    elapsedTime: number;
    
    constructor(private campaignService: CampaignService,
        private surveyService: SurveyService,
        private videoService: VideoService,
        private activeModal: NgbActiveModal,
        private modalService: NgbModal) { 
    }

    ngOnInit() {
        this.loadUserCampaigns();
        this.loadVideos();
        this.resetForm();
    }

    resetForm(form?: NgForm)
    {
        if (form != null)
            form.reset();
        this.survey = {
        CampaignId: 0,
        SurveyId: 0,
        SurveyName: '',
        Description: '',
        Active: false,
        SurveyQuestions: []
        }
    }

    loadUserCampaigns(){
        this.campaignService.getInbox().subscribe(campaigns => { 
            this.userCampaigns = campaigns;
        });
    }

    loadVideos(){
        this.videoService.getVideos().subscribe(videos => { this.videos = videos; });
    }

    getVideoInfo(videoId: number)
    {
        return this.videos.filter(x => x.VideoId == videoId)[0];
    }

    getVideoName(videoId: number)
    {
        var videoInfo = this.getVideoInfo(videoId);
        return  videoInfo ? videoInfo.VideoName : "";
    }

    getVideoFileName(videoId: number)
    {
        var videoInfo = this.getVideoInfo(videoId);
        return  videoInfo ? videoInfo.FileName : "";
    }

    closeModal() {
        this.enableSurvey = false;
        this.modalRef.close('Modal Closed');
    }

    openFormModal(content) {
        this.modalRef = this.modalService.open(content, {size: 'lg'});

        this.modalRef.result.then((result) => {
           console.log(result);
        }).catch((error) => {
            console.log(error);
        });
    }

    viewCampaign(userCampaignId: number, content)
    {
        this.userCampaign = this.userCampaigns.filter(x => x.UserCampaignId  == userCampaignId)[0];
        this.getSurveyDetails(this.userCampaign.Campaign.CampaignId);
        this.videoSource = "assets/" + this.getVideoFileName(this.userCampaign.Campaign.VideoLink); ///NASA.mp4
        this.enableSurvey = false;
        this.openFormModal(content);
    }

    getSurveyDetails(campaignId: number)
    {
        this.surveyService.getSurveyByCampaignId(campaignId).subscribe(survey => { 
            this.survey = survey;
        });
    }

    onVideoStarted()
    {
        this.startTime = Date.now();
    }

    onVideoEnded()
    {
        this.elapsedTime = (Date.now() - this.startTime).valueOf();
        this.userCampaign.VideoTime = this.elapsedTime / 60000;//in minutes
        this.enableSurvey = true;
    }

    selectAnswer(selectedAnswer: string, index: number)
    {
        this.survey.SurveyQuestions[index].Skipped = false;
        this.survey.SurveyQuestions[index].SelectedChoice = selectedAnswer;
    }

    OnSubmit(form: NgForm) {
        this.modalRef.close('modal closed');
        var userAnswers: Array<UserAnswer> = [];
        this.survey.SurveyQuestions.forEach(question => {
            userAnswers.push({ 
                Skipped: question.Skipped,
                SelectedChoice :  question.SelectedChoice,
                QuestionId: question.QuestionId
            });
        });
        this.surveyService.submitSurvey(userAnswers)
            .subscribe((data: any) => {
            if (data.Succeeded == true) {
                this.resetForm(form);
            }});
    }
}