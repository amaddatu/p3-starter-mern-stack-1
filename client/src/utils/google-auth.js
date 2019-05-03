import axios from 'axios';


let AUTHAPI = {
    getAuthorizeLink: () => {
        return process.env.REACT_APP_GOOGLE_AUTH_LINK;
    },
    getUserData: () => {
        return axios.get('/_api/user');
    },
    getLogout: () => {
        return axios.get('/_api/user/logout');
    }
}

export default AUTHAPI;