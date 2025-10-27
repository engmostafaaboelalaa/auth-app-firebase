import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { Auth, AuthErrorCodes, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-log-in',
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink,
    CommonModule
  ],
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.css'
})
export class LogInComponent {
 authForm!:FormGroup;
 //inint the google Auth Provider
 googleAuthProvider = new GoogleAuthProvider();
 //auth Instance
 auth = inject(Auth);
 //progres 
 IsSubmissionInProgress:boolean = false;
 errorMessage:string = "";
 constructor(private router:Router)
 {
  this.initForm();
 }

 initForm()
 {
  this.authForm = new FormGroup({
    Email: new FormControl('' , Validators.required),
    password: new FormControl('' , Validators.required)
  })
 }


 onSubmit()
 {
  if(this.authForm.invalid)
  {
    this.authForm.markAllAsTouched();
    return;
  }else{
    this.IsSubmissionInProgress = true;
    signInWithEmailAndPassword(this.auth , this.authForm.value.Email , this.authForm.value.password).then(res=>{
      this.IsSubmissionInProgress = false;
       this.router.navigate(['/dashboard']);
    })
    .catch(error=>{
      this.IsSubmissionInProgress = false;
      if(error instanceof Error){
        if(error.message.includes(AuthErrorCodes.INVALID_EMAIL))
        {
           this.errorMessage = "Invalid Email"
        }
        else if(error.message.includes('auth/invalid-credential'))
        {
           this.errorMessage = "invalid Email/password";
        }
        else if(error.message.includes(AuthErrorCodes.WEAK_PASSWORD))
        {
           this.errorMessage = "Please Enter Strong Password"
        }
        else if(error.message.includes(AuthErrorCodes.EMAIL_EXISTS))  
        {
           this.errorMessage = "This Email Is Used For Another Acoount"
        }else{
          this.errorMessage = "some thing Went Wrong Please Try Agin!";
        }
      }
    })
  }
 }

 onSignInWithgoogle()
 {
  signInWithPopup(this.auth , this.googleAuthProvider)
  .then(res=>{
    this.router.navigate(['/dashboard']);
  })
  .catch(err=>{
    console.log("error" , err);
    this.errorMessage = "some thing Went Wrong Please Try Agin!";
  })
 }
}
