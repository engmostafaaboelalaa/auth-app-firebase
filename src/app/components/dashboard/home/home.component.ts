import { Component, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth, signOut, User } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  imports: [MatToolbarModule ,  MatButtonModule ,MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
     private activatedRoute = inject(ActivatedRoute);
     private router = inject(Router);
     user:User  = this.activatedRoute.snapshot.data['user'];
     //get the Auth Service 
     auth = inject(Auth);
     constructor()
     {
      console.log(this.user)
     }

     onSignOut()
     {
      signOut(this.auth)
      .then(res=>{
        this.router.navigate(['/auth/sign-in']);
      })
      .catch(err=>{
        console.log("Error " , err);
      })
     }
}
