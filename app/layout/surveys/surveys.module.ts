import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule }   from '@angular/forms';
import { SurveysRoutingModule } from './surveys-routing.module';
import { SurveysComponent } from './surveys.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, SurveysRoutingModule, PageHeaderModule, FormsModule],
    declarations: [SurveysComponent]
})
export class SurveysModule {}