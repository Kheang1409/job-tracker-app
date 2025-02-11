export const environment = {

    contact: {
        email: 'hangkheangtaing@gmail.com',
        phoneNumber: '+ 1 641 233 0129',
    },
    params: {
        jobId: 'id'
    },
    urlShared: {
        login: '/login',
    },
    urlFrontend: {
        home: 'home',
        signIn: 'sign-in',
        signUp: 'sign-up',
        job: 'job',
        job_id: 'job/:id',
        createJob: 'create-job',
        editJob: 'edit-job',
        editJob_id: 'edit-job/:id',
        about: 'about',
        contact: 'contact',
        error: '**',
    },
    urlApi: {
        baseUserUrl: 'http://localhost:5000/api/users',
        baseJobUrl: 'http://localhost:5002/api/jobs',
        subsetUrl: 'applications',
        total: 'totals',
        status: 'status',
        query: {
            pageNumber: 'pageNumber',
            status: 'status',
            sort: 'sort',
        },
    },
    message: {
        updateFailMessage: 'Update unsuccessfully!',
        createFailMessage: 'Create unsuccessfully!',
        unauthorizedMessage: 'Unauthorized!',
        missingUsernamePassword: 'Missing Email or Password!',
        passwordMissedMatch: 'Password missed match!',
        filledInTheBlank: 'Filled in the Blank!'
    },
    numbers: {
        page: 1,
        limit: 5,
    },
    keys: {
        tokenKey: 'authToken',
        pageNumberKey: 'pageNumber'
    },
    forms: {

        applicationForm: 'applicationForm',
        jobForm: 'jobForm',
    }
};
