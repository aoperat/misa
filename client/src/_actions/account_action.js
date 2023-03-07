import axios from 'axios';

import {
    INSERT_ACCOUNT,
    RETRIEVE_ACCOUNT,
    UPDATE_ACCOUNT,
    DELETE_ACCOUNT
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

export function updateAccount(dataToSubmit) {
    console.log("action:")
    const request = axios.put('/api/account/update', dataToSubmit)
        .then(response => response.data)

    return {
        type: UPDATE_ACCOUNT,
        payload: request
    }
}

export function deleteAccount(dataToSubmit) {
    const request = axios.delete(`/api/account/delete/${dataToSubmit.accountId}`)
        .then(response => response.data)

    return {
        type: DELETE_ACCOUNT,
        payload: request
    }
}
