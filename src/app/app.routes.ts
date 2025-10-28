import { Routes } from '@angular/router';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import {AuthGuard, redirectUnauthorizedTo} from '@angular/fire/auth-guard'
import { UserResolver } from './services/User.resolver';


const redirectToLogin = () => redirectUnauthorizedTo('/auth/sign-in');
export const routes: Routes = [
    {path:'' ,
    component:WelcomePageComponent,
    pathMatch:'full'
    },
    {
        path:"auth",
        loadChildren:()=>import('./components/auth/auth.module').then((m)=>m.AuthModule),
    },
    {
        path:"dashboard",
        loadChildren:()=>import('./components/dashboard/dashboard.module').then((m)=>m.DashboardModule),
        canActivate:[AuthGuard],
        data:{
            authGaurdPipe:redirectToLogin
        },
        resolve:{
            user :UserResolver
        }
    }
];
