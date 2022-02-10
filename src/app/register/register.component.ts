import { Component, OnInit } from '@angular/core';
import {UserprofilesService } from '../userprofiles.service';
import {Router} from '@angular/router'
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userprofile:UserprofilesService , private router:Router, private _matSnack:MatSnackBar) {}

register(form) {
    // console.log(form.value);
}

registerUser(myform: NgForm){
  if (!myform.valid){
      this._matSnack.open("Please fill the form", "Invalid data!",{duration: 3000,});
  }
  else if (myform.valid) {
      // this._matSnack.open("", "Registered!",{duration: 2000});
      this.userprofile.registerUser(myform.value).subscribe(()=> {
      this.router.navigate(['/login']);
    });
  }
}

  ngOnInit() {
  }

}
