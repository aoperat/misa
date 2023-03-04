import axios from 'axios';

import {
    RETRIEVE_CARD,
    INSERT_CARD,
    UPDATE_CARD,
    DELETE_CARD
} from './types'


export function retrieveCardList(dataToSubmit) {
    const request = axios.post('/api/card/retrieve', dataToSubmit)
        .then(response => response.data)

    return {
        type: RETRIEVE_CARD,
        payload: request
    }
}

export function insertCard(dataToSubmit) {
    const request = axios.post('/api/card/insert', dataToSubmit)
        .then(response => response.data)

    return {
        type: INSERT_CARD,
        payload: request
    }
}

export function updateCard(dataToSubmit) {
    const request = axios.put('/api/card/update', dataToSubmit)
        .then(response => response.data)

    return {
        type: UPDATE_CARD,
        payload: request
    }
}

export function deleteCard(dataToSubmit) {
    const request = axios.delete(`/api/card/delete/${dataToSubmit.cardId}`)
        .then(response => response.data)

    return {
        type: DELETE_CARD,
        payload: request
    }
}
