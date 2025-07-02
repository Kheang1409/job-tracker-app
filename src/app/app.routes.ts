import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { environment } from '../environments/environment.development';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { JobComponent } from './job/job.component';
import { JobsComponent } from './jobs/jobs.component';
import { ProfileComponent } from './profile/profile.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AboutComponent } from './about/about.component';
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { CreateJobComponent } from './create-job/create-job.component';
import { EditJobComponent } from './edit-job/edit-job.component';


const home = environment.urlFrontend.home;
const about = environment.urlFrontend.about;
const login = environment.urlFrontend.login;
const signUp = environment.urlFrontend.signUp;
const jobs = environment.urlFrontend.jobs;
const job_id = environment.urlFrontend.jobId;
const my_jobs = environment.urlFrontend.myJobs;
const create_job = environment.urlFrontend.createJob;
const edit_job = environment.urlFrontend.editJob;
const profile = environment.urlFrontend.profile;
const forgotPassword = environment.urlFrontend.forgotPassword;
const resetPassword = environment.urlFrontend.resetPassword;
const error = environment.urlFrontend.error;

export const routes: Routes = [
    {
        path: "", redirectTo: home, pathMatch: "full"
    },
    {
        path: home, component: HomeComponent
    },
    {
        path: about, component: AboutComponent
    },
    {
        path: login, component: LoginComponent
    },
    {
        path: signUp, component: SignUpComponent
    },
    {
        path: jobs, component: JobsComponent
    },
    {
        path: job_id, component: JobComponent
    },
    {
        path: profile, component: ProfileComponent
    },
    {
        path: my_jobs, component: MyJobsComponent
    },
    {
        path: create_job, component: CreateJobComponent
    },
    {
        path: edit_job, component: EditJobComponent
    },
    {
        path: forgotPassword, component : ForgotPasswordComponent
    },
    {
        path: resetPassword, component : ResetPasswordComponent
    },
    
    {
        path: error, component: ErrorPageComponent
    }
];
