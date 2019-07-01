export class User {
    UserId: number;
    FirstName: string;
    LastName: string;
    UserName: string;
    Password: string;
    Email: string;
    Department: string;
    RoleId: 0;
    GroupId: 0;
    Active: boolean;
}

export class Role {
    Id: number;
    Name: string;
}