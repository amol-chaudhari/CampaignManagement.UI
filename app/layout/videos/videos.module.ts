import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule }   from '@angular/forms';
import { MatVideoModule } from 'mat-video';
import { VideosRoutingModule } from './videos-routing.module';
import { VideosComponent } from './videos.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, MatVideoModule, VideosRoutingModule, PageHeaderModule, FormsModule],
    declarations: [VideosComponent]
})
export class VideosModule {}