import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule }   from '@angular/forms';
import { MatVideoModule } from 'mat-video';
import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, MatVideoModule, InboxRoutingModule, PageHeaderModule, FormsModule],
    declarations: [InboxComponent]
})
export class InboxModule {}