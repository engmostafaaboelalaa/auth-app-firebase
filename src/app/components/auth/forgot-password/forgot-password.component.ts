import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Auth, sendPasswordResetEmail } from '@angular/fire/auth';

@Component({
  selector: 'app-forgot-password',
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
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
    forgetForm!:FormGroup;
    router = inject(Router);
    auth = inject(Auth)
    errorMessage:string = "";
    isSubmissinInProgress:boolean = false;
    ispasswordEmailSent:boolean = false;
    isSpinning:boolean = false;
    constructor()
    {
      this.initForm();
    }

    //creating the form
    initForm()
    {
      this.forgetForm = new FormGroup({
        Email:new FormControl('' , Validators.required),
      })
    }

    onSubmit()
    {
      if(this.forgetForm.invalid) return ;
      this.isSubmissinInProgress = true;
      this.isSpinning = true;
        //reset password by using reset password link
        sendPasswordResetEmail(this.auth , this.forgetForm.value.Email)
        .then(res=>{
          this.ispasswordEmailSent = true;
          this.isSpinning = false;
        })
        .catch(err=>{
          this.isSubmissinInProgress = false;
          this.errorMessage = "An Error Occured Plese Try Again";
        })
    }
}
