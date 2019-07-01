import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { routerTransition } from '../../router.animations';
import { Group } from '../../shared/models/group.model';
import { GroupService } from '../../shared/services/group.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
    animations: [routerTransition()]
})
export class GroupsComponent implements OnInit {
    group: Group;
    indLoading: boolean = false;
    groups : Group[];
    modalRef: any;

    constructor(private groupService: GroupService,
        private activeModal: NgbActiveModal,
        private modalService: NgbModal) { 
    }

    ngOnInit() {
        this.resetForm();
        this.loadGroups();
    }

    closeModal() {
        this.modalRef.close('Modal Closed');
    }

    loadGroups(){
        this.indLoading = true;
        this.groupService.getGroups().subscribe(groups => { 
            this.groups = groups; 
            this.indLoading = false; 
        });
    }

    resetForm(form?: NgForm) {
        if (form != null)
        form.reset();
        this.group = {
        GroupId: 0,
        GroupName: '',
        Active: false
        }
    }

    OnSubmit(form: NgForm) {
        this.modalRef.close('modal closed');
        if(this.group.GroupId > 0)
        {
            this.groupService.updateGroup(this.group.GroupId, this.group)
            .subscribe((data: any) => {
                if (data == true) {
                    this.resetForm(form);
                    this.loadGroups();
                }
            });
        }
        else{
            this.groupService.createGroup(this.group)
            .subscribe((data: any) => {
                if (data == true) {
                    this.resetForm(form);
                    this.loadGroups();
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

    addGroup(content) {
        this.resetForm();
        this.openFormModal(content);
    }

    editGroup(groupId: number, content) {
        this.group = this.groups.filter(x => x.GroupId == groupId)[0];
        this.openFormModal(content);
    }
}