import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule }   from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, UsersRoutingModule, PageHeaderModule, FormsModule],
    declarations: [UsersComponent]
})
export class UsersModule {}