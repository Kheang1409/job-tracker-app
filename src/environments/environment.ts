export const environment = {
    urlFrontend: {
        home: 'home',
        about: 'about',
        login: 'login',
        signUp: 'sign-up',
        jobs: 'jobs',
        jobId: 'job/:id',
        candidates: 'job/:id/candidates',
        candidateId: 'candidate/:id',
        myJobs: 'my-jobs',
        createJob: 'create-job',
        editJob: 'edit-job/:id',
        profile: 'profile',
        forgotPassword: 'forgot-password',
        resetPassword: 'reset-password',
        error: '**',
    },
    api: {
        baseUrl: 'http://localhost:5000/api',
        auth: {
            base: 'auth',
            forgotPassword: 'forgot-password',
            resetPassword: 'reset-password',
            login: 'login'
        },
        users: {
            base: 'users',
            me: 'me',
            skills: 'skills'
        },
        jobs: {
            base: 'jobs',
            total: 'total',
            candidates: 'candidates',
            status: 'status',
            me: 'me'
        }
    },
    CONSTAINT: {
        PAGE: 1,
        LIMIT: 9,
    },
    keys: {
        tokenKey: 'authToken',
        resetPasswordToken: 'resetPasswordToken',
        pageNumberKey: 'pageNumber'
    },
};
