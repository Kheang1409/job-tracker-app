import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { environment } from '../environments/environment.development';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { EditJobComponent } from './edit-job/edit-job.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { JobComponent } from './job/job.component';
import { AboutComponent } from './about/about.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


const home = environment.urlFrontend.home;
const signIn = environment.urlFrontend.signIn;
const signUp = environment.urlFrontend.signUp;
const job_id = environment.urlFrontend.job_id;
const editJob_id = environment.urlFrontend.editJob_id;
const createJob = environment.urlFrontend.createJob;
const about = environment.urlFrontend.about;
const contact = environment.urlFrontend.contact;
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
        path: job_id, component: JobComponent
    },
    {
        path: createJob, component: CreateJobComponent
    },
    {
        path: editJob_id, component: EditJobComponent
    },
    {
        path: about, component: AboutComponent
    },
    {
        path: contact, component: ContactUsComponent
    },
    {
        path: error, component: ErrorPageComponent
    }
];
