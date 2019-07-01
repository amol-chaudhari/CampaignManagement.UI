import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { routerTransition } from '../../router.animations';
import { Campaign } from '../../shared/models/campaign.model';
import { Survey, Question } from '../../shared/models/survey.model';
import { CampaignService } from '../../shared/services/campaign.service';
import { SurveyService } from '../../shared/services/survey.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-surveys',
    templateUrl: './surveys.component.html',
    styleUrls: ['./surveys.component.scss'],
    animations: [routerTransition()]
})
export class SurveysComponent implements OnInit {
    campaigns : Campaign[];
    survey: Survey;
    question: Question;
    selectedCampaign: number;
    isVisible: boolean;
    modalRef: any;
    selectedQuestionIndex: number;

    constructor(
        private campaignService: CampaignService,
        private surveyService: SurveyService,
        private activeModal: NgbActiveModal,
        private modalService: NgbModal) { }

    ngOnInit() {
        this.selectedCampaign = 0;
        this.resetForm();
        this.loadAllCampaigns();
    }
    
    loadAllCampaigns(){
        this.campaignService.getAllCampaign().subscribe(campaigns => {
            this.campaigns = campaigns.filter(x => x.Active);
        });
    }

    loadSurvey(campaignId: number)
    {
        this.selectedCampaign = campaignId;
        this.resetForm();
        if(campaignId > 0)
            this.surveyService.getSurveyByCampaignId(campaignId).subscribe(survey => { this.survey = survey; });
        else 
            this.survey.CampaignId = this.selectedCampaign;
    }

    resetForm(form?: NgForm) {
        if (form != null)
            form.reset();
        this.survey = {
            SurveyId: 0,
            CampaignId: 0,
            SurveyName: '',
            Description: '',
            SurveyQuestions: Question[0],
            Active: false
        }
    }
    
    resetQuestionForm(form?: NgForm) {
        if (form != null)
            form.reset();
        this.selectedQuestionIndex = -1;
        this.question = {
            QuestionId: 0,
            SurveyId: this.survey.SurveyId,
            Description: '',
            Choice1: '',
            Choice2: '',
            Choice3: '',
            Choice4: '',
            Active: true,
            SelectedChoice: '',
            Skipped: false
        }
    }

    closeModal() {
        this.modalRef.close('Modal Closed');
    }

    openFormModal(content) {
        this.modalRef = this.modalService.open(content, {size: "lg"});
        
        this.modalRef.result.then((result) => {
            console.log(result);
        }).catch((error) => {
            console.log(error);
        });
    }

    addQuestion(content)
    {
        this.isVisible = true;
        this.resetQuestionForm();
        this.openFormModal(content);
    }

    editQuestion(questionId: number, content: any, index: number) {
        this.selectedQuestionIndex = index;
        this.isVisible = true;
        // if(questionId > 0)
        //   this.question = this.survey.SurveyQuestions.filter(x => x.QuestionId == questionId)[0];
        // else
            this.question = this.survey.SurveyQuestions[index];
        this.openFormModal(content);
    }

    removeQuestion(questionId: number)
    {
        this.surveyService.removeQuestion(questionId).subscribe((data: any) => 
        {
            if (data == true) {
            this.survey.SurveyQuestions = data.List;
            }
        });
    }

    OnQuestionSubmit(form: NgForm)
    {
        this.modalRef.close('modal closed');
        this.surveyService.createQuestion(this.question).subscribe((data: any) => {
            if (data == true) {
                this.survey.SurveyQuestions = data.List;
                this.resetQuestionForm(form);
            }});
    }

    OnSubmit(form: NgForm) {
        this.survey.CampaignId = this.selectedCampaign;
        this.surveyService.createSurvey(this.survey)
            .subscribe((data: any) => {
            if (data.Succeeded == true) {
                this.resetForm(form);
            }});
    }
}