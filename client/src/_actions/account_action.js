import axios from 'axios';

import {
    INSERT_ACCOUNT,
    RETRIEVE_ACCOUNT
} from './types'


export function retrieveAccountList(dataToSubmit){

    const request = axios.post('/api/account/retrieve',dataToSubmit)
         .then(response => response.data)

    return {
        type: RETRIEVE_ACCOUNT,
        payload: request
    }
}

export function insertAccount(dataToSubmit){

    const request = axios.post('/api/account/insert',dataToSubmit)
         .then(response => response.data)

    return {
        type: INSERT_ACCOUNT,
        payload: request
    }
}
