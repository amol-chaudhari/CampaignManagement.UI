import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule }   from '@angular/forms';
import { GroupsRoutingModule } from './groups-routing.module';
import { GroupsComponent } from './groups.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, GroupsRoutingModule, PageHeaderModule, FormsModule],
    declarations: [GroupsComponent]
})
export class GroupsModule {}