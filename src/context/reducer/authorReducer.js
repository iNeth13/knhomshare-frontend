import {
  AUTHOR_RECOMMEND_REQ,
  AUTHOR_RECOMMEND_SUCCESS,
  AUTHOR_RECOMMEND_FAIL,
} from "../action/authorAction";

const authorReducer = (state, action) => {
    switch(action.type){
        case AUTHOR_RECOMMEND_REQ:
            
        case AUTHOR_RECOMMEND_SUCCESS:
            console.log(action.payload);
            return {
                ...state,
                recommendedAuthors : action.payload
            }
        case AUTHOR_RECOMMEND_FAIL:

        default :
        return state;
    }
};

export default authorReducer;
