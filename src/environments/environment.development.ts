export const environment = {

    application: {
        name: 'Restos',
        description: 'Savor the flavors and indulge in the culinary delights. Experience unmatched taste and pure bliss.',
        developer: 'Kheang',

    },
    params: {
        restaurantId: 'id',
        dishId: 'dishId',
    },
    urlShared: {
        login: '/login',
    },
    urlFrontend: {
        home: 'home',
        signIn: 'sign-in',
        signUp: 'sign-up',
        error: '**',
    },
    urlApi: {
        baseUserUrl: 'http://localhost:5000/api/users',
        baseJobUrl: 'http://localhost:5002/api/jobs',
        subsetUrl: 'applications',
        total: 'totals',
        status: 'status',
        applications: 'applications',
        query: {
            pageNumber: 'pageNumber',
            status: 'status'
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
        pageNumberKey: 'pageNumber',
    },
    forms: {

        applicationForm: 'applicationForm',
        jobForm: 'jobForm',
    }
};
