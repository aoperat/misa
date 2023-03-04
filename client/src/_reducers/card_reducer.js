import {
    INSERT_CARD,
    RETRIEVE_CARD,
    UPDATE_CARD,
    DELETE_CARD
  } from '../_actions/types'
  
  export default function(state = {}, action) {
    switch (action.type) {
      case INSERT_CARD:
        return { ...state, insertSuccess: action.payload };
      case RETRIEVE_CARD:
        return { ...state, retrieveSuccess: action.payload };
      case UPDATE_CARD:
        return { ...state, updateSuccess: action.payload };
      case DELETE_CARD:
        return { ...state, deleteSuccess: action.payload };
      default:
        return state;
    }
  }
