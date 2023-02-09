import axios from 'axios';

import {
    INSERT_ACCOUNT
} from './types'

export function insertAccount(dataToSubmit){

    const request = axios.post('/api/account/insert',dataToSubmit)
         .then(response => response.data)

    return {
        type: INSERT_ACCOUNT,
        //payload: request
        payload: request
    }
}
