import { Component, OnInit } from '@angular/core';
import {UserprofilesService } from '../userprofiles.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private  userprofile:UserprofilesService, private router:Router, private _matSnack:MatSnackBar) { }  
  
  ngOnInit() {}
  
  loginUser(loginform:NgForm){
    if(!loginform.valid) {this._matSnack.open("Error!","Please fill the login form!" ,{duration: 3000,})};
    if (loginform.valid){
      this.userprofile.loginUser(loginform.value).subscribe((res)=>{
        
        this.userprofile.getUsername(res);
        this.router.navigate(['/manual']); 
      },
      (err)=>{
        this._matSnack.open("Error!",err.error.message ,{duration: 4000,});
      }
      )
    } 
  }
}
