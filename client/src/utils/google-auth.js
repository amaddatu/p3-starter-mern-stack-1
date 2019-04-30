import axios from 'axios';


let AUTHAPI = {
    getAuthorizeLink: () => {
        return process.env.REACT_APP_GOOGLE_AUTH_LINK;
    },
    getUserData: () => {
        return axios.get('/_api/user');
    }
}

export default AUTHAPI;