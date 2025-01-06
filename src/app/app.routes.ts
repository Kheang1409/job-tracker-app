import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { environment } from '../environments/environment.development';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';


const home = environment.urlFrontend.home;
const signIn = environment.urlFrontend.signIn;
const signUp = environment.urlFrontend.signUp;
const error = environment.urlFrontend.error;

export const routes: Routes = [
    {
        path: "", redirectTo: home, pathMatch: "full"
    },
    {
        path: home, component: HomeComponent
    },
    {
        path: signIn, component: LoginComponent
    },
    {
        path: signUp, component: SignUpComponent
    },
    {
        path: error, component: ErrorPageComponent
    }
];
