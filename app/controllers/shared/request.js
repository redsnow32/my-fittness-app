import axios from 'axios'
import constants from '../constants'

const client = axios.create({
    baseURL: constants.api.url
});

const request = function (options) {
    const onSuccess = function (response) {
        console.debug('Request Successful!', response);
        return response.data;
    }
    const onError = function (error) {
        console.error('rRequest Failed:', error.config);

        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
            console.error('Headers:', error.response.headers);
        } else {
            console.error('Error Message:', error.message)
        }
        return Promise.rejection(error.response || error.message);
    }
    return client(options)
    .then(onSuccess)
    .catch(onError);
}

export default request;