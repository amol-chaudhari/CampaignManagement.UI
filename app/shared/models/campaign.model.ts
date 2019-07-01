import { Group } from './group.model';
import { Survey } from './survey.model';

export class Campaign {
    CampaignId: number;
    CampaignName: string;
    ReferenceId: number;
    Category: string;
    Level: string;
    Description: string;
    VideoLink: number;
    VideoDetails: string;
    Active: boolean;
    GroupId: number;
    PublishedDate: string;
    PublishedBy: string;
}

export class UserCampaign
{
    UserCampaignId: number;
    Campaign:Campaign;
    Group: Group;
    ViewDate: string;
    VideoWatched: string;
    VideoTime: number;
    VideoDate: string;
    CompletedDate: string;
    Survey: Survey;
}