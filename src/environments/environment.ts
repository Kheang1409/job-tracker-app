export const environment = {
    urlFrontend: {
        home: 'home',
        jobs: 'jobs',
        about: 'about',
        login: 'login',
        signUp: 'sign-up',
        job: 'job',
        jobId: 'job/:id',
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
            me: 'me'
        },
        jobs: {
            base: 'jobs',
            total: 'total',
            candidates: 'candidates',
            me: 'me'
        },
        // query: {
        //     pageNumber: 'pageNumber',
        //     status: 'status',
        //     sort: 'sort',
        // },
    },
    numbers: {
        page: 1,
        limit: 4,
    },
    keys: {
        tokenKey: 'authToken',
        resetPasswordToken: 'resetPasswordToken',
        pageNumberKey: 'pageNumber'
    },
};
