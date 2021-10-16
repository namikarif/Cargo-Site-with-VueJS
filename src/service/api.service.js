import axios from "axios";

const config = {
    headers: {
        'Www-Authorization': 'Bearer ' + localStorage.getItem('access_token')
    }
}

export function login(endpint, data) {
    let loginConfig = {
        headers: {
            'Www-Authorization': 'Bearer login'
        }
    }
    return axios.post('https://mapi.namikarifoglu.com/' + endpint, data, loginConfig).then(response => response.data).catch(error => errorHandler(error));
}

export function post(endpint, data) {
    return axios.post('https://mapi.namikarifoglu.com/' + endpint, data, config).then(response => response.data).catch(error => errorHandler(error));
}

export function get(endpint) {
    return axios.get('https://mapi.namikarifoglu.com/' + endpint, config).then(response => response.data).catch(error => errorHandler(error));
}

const errorHandler = (error) => {
    if (error.response.status === 401) {
        // store.dispatch('user/logout') // here is the problem
    }
    return Promise.reject({...error})
}
