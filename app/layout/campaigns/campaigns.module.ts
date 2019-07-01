import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule }   from '@angular/forms';
import { CampaignsRoutingModule } from './campaigns-routing.module';
import { CampaignsComponent } from './campaigns.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, CampaignsRoutingModule, PageHeaderModule, FormsModule],
    declarations: [CampaignsComponent]
})
export class CampaignsModule {}