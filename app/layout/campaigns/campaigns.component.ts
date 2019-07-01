import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { routerTransition } from '../../router.animations';
import { Campaign } from '../../shared/models/campaign.model';
import { CampaignService } from '../../shared/services/campaign.service';
import { GroupService } from '../../shared/services/group.service';
import { VideoService } from '../../shared/services/video.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Video } from '../../shared/models/video.model';
import { Group } from '../../shared/models/group.model';

@Component({
    selector: 'app-campaigns',
    templateUrl: './campaigns.component.html',
    styleUrls: ['./campaigns.component.scss'],
    animations: [routerTransition()]
})
export class CampaignsComponent implements OnInit {
    campaign: Campaign;
    isVisible: boolean = false;
    indLoading: boolean = false;
    campaigns : Campaign[];
    videos: Video[];
    modalRef: any;
    groups: Array<Group> = [];

    constructor(private campaignService: CampaignService,
        private groupService: GroupService,
        private videoService: VideoService,
        private activeModal: NgbActiveModal,
        private modalService: NgbModal) { }

    ngOnInit() {
        this.loadVideos();
        this.resetForm();
        this.loadAllCampaigns();
        this.loadGroups();
    }

    onOptionsChanged(event)
    {
        this.campaign.VideoLink = event;
    }

    closeModal() {
        this.modalRef.close('Modal Closed');
    }

    loadAllCampaigns(){
        this.indLoading = true;
        this.campaignService.getAllCampaign().subscribe(campaigns => { 
            this.campaigns = campaigns; 
            this.indLoading = false; 
        });
    }

    loadVideos(){
        this.videoService.getVideos().subscribe(videos => { this.videos = videos.filter(x => x.Active); });
    }

    resetForm(form?: NgForm) {
        if (form != null)
        form.reset();
        this.campaign = {
        CampaignId: 0,
        CampaignName: '',
        Description: '',
        Category: '',
        Level: '',
        ReferenceId: 0,
        VideoDetails: '',
        VideoLink: 0,
        Active: false,
        GroupId: 0,
        PublishedDate: '',
        PublishedBy: ''
        }
    }

    OnSubmit(form: NgForm) {
        this.modalRef.close('modal closed');
        if(this.campaign.CampaignId > 0)
        {
            this.campaignService.updateCampaign(this.campaign.CampaignId, this.campaign)
            .subscribe((data: any) => {
                if (data == true) {
                    this.resetForm(form);
                    this.loadAllCampaigns();
                }
            });
        }
        else
        {
            this.campaignService.createCampaign(this.campaign)
            .subscribe((data: any) => {
                if (data == true) {
                    this.resetForm(form);
                    this.loadAllCampaigns();
                }
            });
        }
    }

    openFormModal(content) {
        this.modalRef = this.modalService.open(content, {size: 'lg'});
        
        this.modalRef.result.then((result) => {
        console.log(result);
        }).catch((error) => {
        console.log(error);
        });
    }

    addCampaign(content) {
        this.isVisible = true;
        this.resetForm();
        this.openFormModal(content);
    }

    editCampaign(campaignId: number, content) {
        this.isVisible = true;
        this.campaign = this.campaigns.filter(x => x.CampaignId == campaignId)[0];
        this.openFormModal(content);
    }

    loadGroups()
    {
        this.groups = [];
        this.groupService.getGroups().subscribe(groups => { this.groups = groups.filter(x => x.Active); });
    }

    publishCampaign(campaignId: number, publish)
    {
        this.campaign = this.campaigns.filter(x => x.CampaignId == campaignId)[0];
        this.openFormModal(publish);
    }

    onPublishOptionsChanged(groupId)
    {
        this.campaign.GroupId = groupId;
    }

    OnPublishSubmit(form: NgForm) {
        this.modalRef.close('modal closed');
        this.campaignService.publishCampaign(this.campaign)
        .subscribe((data: any) => {
            if (data == true) {
                this.resetForm(form);
                this.loadAllCampaigns();
            }
        });
    }

    getVideoName(videoLink: number)
    {
        return this.videos.filter(x => x.VideoId == videoLink)[0] ? this.videos.filter(x => x.VideoId == videoLink)[0].VideoName : "";
    }
}