// Global
const HOME = '/';
const JOIN = '/join';
const LOGIN = '/login';
const LOGOUT = '/logout';
const SEARCH = '/search';

// Users
const USER = '/users';
const USER_DETAIL = '/:id';
const EDIT_PROFILE = '/edit-profile';
const CHANGE_PASSWORD = '/change-password';

// Videos
const VIDEOS = '/videos';
const UPLOAD = '/upload';
const VIDEO_DETAIL = '/:id';
const EDIT_VIDEO = '/:id/edit';
const DELETE_VIDEO = '/:id/delete';

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,

    user: USER,
    userDetail: (id) => {
        if (id) {
            return `${USER}/${id}`;
        }

        return USER_DETAIL;
    },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,

    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: (id) => {
        if (id) {
            return `${VIDEOS}/${id}`;
        }

        return VIDEO_DETAIL;
    },
    editVideo: (id) => {
        if (id) {
            return `${VIDEOS}/${id}/edit`;
        }

        return EDIT_VIDEO;
    },
    deleteVideo: (id) => {
        if (id) {
            return `${VIDEOS}/${id}/delete`;
        }

        return DELETE_VIDEO;
    },
};

export default routes;
