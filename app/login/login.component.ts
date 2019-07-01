import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { routerTransition } from '../router.animations';
import { UserService } from '../shared/services/user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
    isLoginError : boolean = false;

    constructor(
    private userService : UserService,
    public router: Router
    ) {}

    ngOnInit() {}

    onLoggedin() {
        localStorage.setItem('userToken', 'true');
    }

    OnSubmit(userName,password){
        this.userService.userAuthentication(userName,password).subscribe((data : any)=>{
         localStorage.setItem('userToken',data.access_token);
         this.router.navigate(['/dashboard']);
       },
       (err : HttpErrorResponse)=>{
         this.isLoginError = true;
       });
     }
}
