export class Question {
    QuestionId: number;
    SurveyId: number;
    Description: string;
    Choice1: string;
    Choice2: string;
    Choice3: string;
    Choice4: string;
    Active: boolean;
    Skipped: boolean;
    SelectedChoice: string;
}

export class UserAnswer
{
    QuestionId: number;
    SelectedChoice: string;
    Skipped: boolean;
}

export class Survey {
    CampaignId: number;
    SurveyId: number;
    SurveyName: string;
    Description: string;
    Active: boolean;
    SurveyQuestions: Array<Question>;
}