import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { routerTransition } from '../../router.animations';
import { User, Role } from '../../shared/models/user.model';
import { Group } from '../../shared/models/group.model';
import { UserService } from '../../shared/services/user.service';
import { GroupService } from '../../shared/services/group.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
    animations: [routerTransition()]
})
export class UsersComponent implements OnInit {
    user: User;
    isVisible: boolean = false;
    users : User[];
    groups : Group[];
    roles: Array<Role> = [];
    modalRef: any;
    emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    constructor(private userService: UserService,
        private groupService: GroupService,
        private activeModal: NgbActiveModal,
        private modalService: NgbModal) { 
        }

    ngOnInit() {
        this.resetForm();
        this.loadAllUsers();
        this.loadRoles();
    }

    loadGroups()
    {
        var allGroups: Array<Group>;
        this.groupService.getGroups().subscribe(groups => { allGroups = groups; });
        this.groups = allGroups.filter(x => x.Active);
    }

    loadRoles()
    {
        this.roles.push({ Id: 1, Name: "Executive" });
        this.roles.push({ Id: 2, Name: "Manager" });
        this.roles.push({ Id: 3, Name: "User" });
    }

    loadAllUsers(){
        this.userService.getAllUser().subscribe(users => { this.users = users; });
    }

    resetForm(form?: NgForm) 
    {
        if (form != null)
        form.reset();
        this.user = {
        UserId: 0,
        FirstName: '',
        LastName: '',
        UserName: '',
        Email: '',
        Password: '',
        Department: '',
        RoleId: 0,
        GroupId: 0,
        Active: false
        }
    }

    onOptionsChanged(roleId)
    {
        this.user.RoleId = roleId;
    }

    onGroupOptionsChanged(groupId)
    {
        this.user.GroupId = groupId;
    }

    openFormModal(content) {
        this.modalRef = this.modalService.open(content, {size: 'lg'});
        
        this.modalRef.result.then((result) => {
        console.log(result);
        }).catch((error) => {
        console.log(error);
        });
    }

    addUser(content) {
        this.isVisible = true;
        this.resetForm();
        this.openFormModal(content);
    }

    editUser(userId: number, content) {
        this.isVisible = true;
        this.user = this.users.filter(x => x.UserId == userId)[0];
        this.openFormModal(content);
    }

    getRoleName(roleId: number)
    {
        return this.roles.filter(x => x.Id == roleId)[0] ? this.roles.filter(x => x.Id == roleId)[0].Name : "";
    }

    OnSubmit(form: NgForm) {
        this.modalRef.close('modal closed');
        if(this.user.UserId > 0)
        {
            this.userService.updateUser(this.user.UserId, this.user)
            .subscribe((data: any) => {
                if (data == true) {
                    this.resetForm(form);
                    this.loadAllUsers();
                }
            });
        }
        else
        {
            this.userService.registerUser(this.user)
            .subscribe((data: any) => {
                if (data == true) {
                    this.resetForm(form);
                    this.loadAllUsers();
                }
            });
        }
    }
}